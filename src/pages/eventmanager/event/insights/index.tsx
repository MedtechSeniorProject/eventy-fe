import Charts from "@/components/Charts";
import EventHeader from "@/components/EventHeader";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetEventById,
  useGetEventStatistics,
  useAttendeesByEvent,
  useGetResponsesClassification,
  useGetEvaluationResponses,
} from "@/lib/queries/queries";
import { BarChart2, Percent, User } from "lucide-react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useParams } from "react-router-dom";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const EventStatistics = () => {
  const { id } = useParams() as { id: string };

  const {
    data: event,
    isLoading: eventLoading,
    isError: eventError,
  } = useGetEventById(id);

  const {
    data: attendeesList,
    isLoading: attendeesListLoading,
    isError: attendeesListError,
  } = useAttendeesByEvent(id);

  const {
    data: responses,
    isLoading: responsesLoading,
    isError: responsesError,
  } = useGetEvaluationResponses(id);

  const evalResponses = responses?.data;
  console.log(evalResponses);

  const {
    data: eventStatistics,
    isLoading: isStatisticsLoading,
    isError: isStatisticsError,
  } = useGetEventStatistics(id);

  console.log(eventStatistics);

  const { mutateAsync: classifyResponses } = useGetResponsesClassification();
  const [classificationResults, setClassificationResults] = useState(null);

  // getting the event's form questions to be added as the first row to the csv file
  function extractQuestionsFromEvent(event: { questions: any[] }) {
    if (!event || !event.questions) {
      return []; // Handle cases where event is missing or questions is missing
    }

    return event.questions.map(
      (question: { question: any }) => question.question
    );
  }

  const questions = extractQuestionsFromEvent(event);

  if (
    isStatisticsLoading ||
    attendeesListLoading ||
    eventLoading ||
    responsesLoading
  ) {
    return <Loading />;
  }

  if (
    isStatisticsError ||
    !eventStatistics ||
    attendeesListError ||
    eventError ||
    responsesError
  ) {
    return <div>Error: Failed to load event</div>;
  }
  //console.log(eventStatistics);

  // saving the responses of the attendees
  const csvresponses = attendeesList
    .filter(
      (attendee: { responses: string | any[] }) =>
        attendee.responses && attendee.responses.length > 0
    )
    .map((attendee: { responses: any[] }) =>
      attendee.responses.map(
        (response: { responses: any[] }) => response.responses[0]
      )
    );

  const csvData = [questions, ...csvresponses];
  //console.log("csv data: ", csvData);

  // calculate the sentiment percentages for each question of type Input
  Object.keys(evalResponses).forEach((questionId) => {
    if (evalResponses[questionId].type === "Input") {
      const sentiments = {
        Positive: 0,
        Negative: 0,
        Neutral: 0,
      };
      evalResponses[questionId].responses.forEach((response) => {
        if (response.classification === "positive") {
          sentiments.Positive += 1;
        } else if (response.classification === "negative") {
          sentiments.Negative += 1;
        } else {
          sentiments.Neutral += 1;
        }
      });
      evalResponses[questionId].sentiments = sentiments;
      evalResponses[questionId].sentimentPercentages = {
        Positive:
          (sentiments.Positive /
            Object.keys(evalResponses[questionId].responses).length) *
          100,
        Negative:
          (sentiments.Negative /
            Object.keys(evalResponses[questionId].responses).length) *
          100,
        Neutral:
          (sentiments.Neutral /
            Object.keys(evalResponses[questionId].responses).length) *
          100,
      };
      console.log(evalResponses[questionId]);
    }
  });

  return (
    <>
      <SEO
        title="Eventy - Event Insights"
        description="Event Management System Event Insights Page"
        name="Eventy"
        type="event insights"
      />
      <div className="w-10/12">
        <EventHeader
          name={"Event Statistics - " + event?.name}
          address={event?.address}
          endTime={event?.endTime}
          time={event?.startTime}
        />
        <div className="mt-5 mb-8 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Invitees
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventStatistics.numberOfInvitees}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Attendees
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventStatistics.numberOfAttendees}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Attendance Rate
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventStatistics.attendanceRate * 100}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                On Spot Attendees
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eventStatistics.onSpotAttendees.length}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10">
          <div className="flex gap-5">
            <div className="font-bold text-xl mb-3">Event Timeline</div>
          </div>
          <Charts checkinData={eventStatistics.eventTimeline} />
        </div>
        {/*
        <div className="mt-10 flex">
        <div className="flex gap-5">
              <MessageSquare size={30} strokeWidth={2} />
              <div className="font-bold text-xl mb-3">Form Insights</div>
            </div>
        </div>

      <FormsBarChart sentimentPercentages={sentimentPercentages} ></FormsBarChart>
      
      <div className="flex justify-between  my-4">
      <Button className=" ml-7" variant={"secondary"} onClick={() => handleClassifyResponses()}>Get Responses Analysis</Button> */}
        {Object.keys(evalResponses).length != 0 && (
          <div>
            <div className="w-full text-xl font-bold text-center p-8">
              Evaluation results :
            </div>
            {event.questions.length > 0 &&
              event.questions.map((question, index) => (
                <div key={index} className="w-full p-8 h-96 text-center">
                  <div className="text-xl mb-8">{question.question}</div>
                  <div className="w-full flex flex-row justify-around">
                    {evalResponses[question.id] &&
                      evalResponses[question.id].type === "Choice" &&
                      Object.keys(evalResponses[question.id].responses).map(
                        (option, index) => (
                          <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <CardTitle className="text-sm font-medium">
                                {option}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">
                                {evalResponses[question.id].responses[option]}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    {evalResponses[question.id] &&
                      evalResponses[question.id].type === "Input" && (
                        <div key={question.id} className="w-64 h-64">
                          <Pie
                            data={{
                              labels: ["Positive", "Negative", "Neutral"],
                              datasets: [
                                {
                                  label: "# of answers",
                                  backgroundColor: [
                                    "rgba(75, 192, 192, 0.5)",
                                    "rgba(255, 99, 132, 0.5)",
                                    "rgba(255, 159, 64, 0.5)",
                                  ],
                                  data: [
                                    evalResponses[question.id]
                                      .sentimentPercentages.Positive,
                                    evalResponses[question.id]
                                      .sentimentPercentages.Negative,
                                    evalResponses[question.id]
                                      .sentimentPercentages.Neutral,
                                  ],
                                },
                              ],
                            }}
                          />
                        </div>
                      )}
                  </div>
                </div>
              ))}
          </div>
        )}
        <div className="p-16">
          <CSVLink
            filename={event.name + "_form_responses.csv"}
            className="bg-white text-black border-2 border-black hover:bg-black hover:text-white text-center p-2 font-semibold text-sm"
            data={csvData}
          >
            Export Foms Data
          </CSVLink>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default EventStatistics;
