import Charts from "@/components/Charts";
import EventHeader from "@/components/EventHeader";
import FormsBarChart from "@/components/FormsBarChart";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetEventById, useGetEventStatistics,useAttendeesByEvent } from "@/lib/queries/queries";
import { Percent, User, } from "lucide-react";
import { CSVLink } from "react-csv";
import { useParams } from "react-router-dom";

const EventStatistics = () => {
  const { id } = useParams() as { id: string };

  const {
    data: event,
    isLoading:eventLoading,
    isError: eventError,
  } = useGetEventById(id);

  const {
    data: attendeesList,
    isLoading:attendeesListLoading,
    isError: attendeesListError,
  } = useAttendeesByEvent(id);

  const {
    data: eventStatistics,
    isLoading: isStatisticsLoading,
    isError: isStatisticsError,
  } = useGetEventStatistics(id);



// getting the event's form questions to be added to the csv file
  function extractQuestionsFromEvent(event: { questions: any[]; }) {
    if (!event || !event.questions) {
      return []; // Handle cases where event is missing or questions is missing
    }
  
    return event.questions.map((question: { question: any; }) => question.question);
  }


const questions = extractQuestionsFromEvent(event);



    //TOADD to api and queries ? ( or just whatever one takes endpoints)
  //maybe we will add a useGetResponsesCategorization(text); to get the sentiment of the responses
  // const { data: responsesCategorization } = useGetResponsesCategorization("text");

/* should look sth like this :
  const {
    data: responsesCategorization,
    isLoading: responsesCategorizationLoading,
    isError: responsesCategorizationError,
  } = useGetResponsesCategorization("text");


*/

  if (isStatisticsLoading || attendeesListLoading || eventLoading) {
    return <Loading />;
  }

  if (isStatisticsError || !eventStatistics || attendeesListError || eventError) {
    return <div>Error: Failed to load event</div>;
  }
  console.log(eventStatistics);
// saving the responses of the attendees
const responses = attendeesList.filter(
  (attendee: { responses: string | any[]; }) => attendee.responses && attendee.responses.length > 0
)
.map((attendee: { responses: any[]; }) => attendee.responses.map((response: { responses: any[]; }) => response.responses[0]));

const csvData = [questions, ...responses];

console.log("csv data: ",csvData);

//TOFIX @SAHAR  : should send the responses ↑ to the sentiment analysis api and store the result in the responseSentiment array
// maybe loop through the responses array and send each response to the sentiment analysis api and store the result in the responseSentiment array by appending the result to the array


// for now we will use this dummay data array to calculate the sentiment
const responseSentiment = [
  "positive",
  "negative",
  "positive",
  "neutral",
];

// counting the number of each sentiment to calculate the response rate 
const sentimentCounts: { [key: string]: number } = {
  positive: 0,
  negative: 0,
  neutral: 0,
};

for (const sentiment of responseSentiment) {
  sentimentCounts[sentiment] += 1;
}

// calculating the percentage of each sentiment
const totalResponses = responseSentiment.length;

const sentimentPercentages = {
  positive: (sentimentCounts.positive / totalResponses) * 100,
  negative: (sentimentCounts.negative / totalResponses) * 100,
  neutral: (sentimentCounts.neutral / totalResponses) * 100,
};

//console log each sentiment percentage : negative , positive , neutral

console.log("sentiment percentages:  ",sentimentPercentages);

  return (
    <>
    <SEO
        title="Eventy - Event Insights"
        description="Event Management System Event Insights Page"
        name="Eventy"
        type="event insights" />
      <div className="w-10/12">
        <EventHeader name={"Event Statistics - " + event?.name} address={event?.address} endTime={event?.endTime} time={event?.startTime}/>
        <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
        <div className="mt-5">
            <div className="font-bold text-xl mb-3">Event Timeline</div>
          <Charts checkinData={eventStatistics.eventTimeline} />
        </div>

        <div className="mt-5">
            <div className="font-bold text-xl mb-3">Forms Insights</div>
        </div>
      <FormsBarChart sentimentPercentages={sentimentPercentages} ></FormsBarChart>
      <div className="flex justify-end my-4">
      <CSVLink filename={event.name+"_form_responses.csv"} className="bg-white text-black border-2 border-black hover:bg-black hover:text-white text-center p-2 font-semibold text-sm" data={csvData}>Export Foms Data</CSVLink>
      </div>
      </div>
    </>
  );
};

export default EventStatistics;