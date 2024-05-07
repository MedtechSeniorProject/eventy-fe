import Charts from "@/components/Charts";
import EventHeader from "@/components/EventHeader";
import FormsBarChart from "@/components/FormsBarChart";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useGetEventById, useGetEventStatistics,useAttendeesByEvent, useGetResponsesClassification } from "@/lib/queries/queries";
import { AxiosError } from "axios";
import { BarChart2, MessageSquare, Percent, User, } from "lucide-react";
import { useState } from "react";
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


  const { mutateAsync: classifyResponses } = useGetResponsesClassification();
  const [classificationResults, setClassificationResults] = useState(null);


  
// getting the event's form questions to be added as the first row to the csv file
  function extractQuestionsFromEvent(event: { questions: any[]; }) {
    if (!event || !event.questions) {
      return []; // Handle cases where event is missing or questions is missing
    }
  
    return event.questions.map((question: { question: any; }) => question.question);
  }

const questions = extractQuestionsFromEvent(event);


  if (isStatisticsLoading || attendeesListLoading || eventLoading ) {
    return <Loading />;
  }

  if (isStatisticsError || !eventStatistics || attendeesListError || eventError ) {
    return <div>Error: Failed to load event</div>;
  }
  console.log(eventStatistics);


// saving the responses of the attendees
  const csvresponses = attendeesList.filter(
  (attendee: { responses: string | any[]; }) => attendee.responses && attendee.responses.length > 0
)
.map((attendee: { responses: any[]; }) => attendee.responses.map((response: { responses: any[]; }) => response.responses[0]));

const csvData = [questions, ...csvresponses];
console.log("csv data: ",csvData);


// flattening the list of responses to be classified
const classificationresponses = csvresponses.flat();



const handleClassifyResponses = async() => {
  console.log("responsesss checkkkk: ",classificationresponses);
  try{
    const response= await classifyResponses(classificationresponses);
     setClassificationResults(response.data); 

    toast({title:"Responses Classified Successfully", })
  }catch(error){
    console.error('Error:', error)
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      toast({variant:"destructive", title:"Error", description:"Failed classify data!"})
    } else if (axiosError.request) {
      console.error('No response received:', axiosError.request);
      toast({ variant:"destructive", title: 'Network Error', description: 'Failed to fetch data due to network issue!' });
    } else {
      console.error('Request setup error:', axiosError.message);
      toast({ variant:"destructive", title: 'Request Error', description: 'Failed to setup request!' });
    }
  }
}



const filteredResults = classificationResults ? classificationResults.map((response: { classification: any; }) => response.classification) : [];
console.log("filtered results: ",filteredResults);


// counting the number of each sentiment to calculate the response rate 
const sentimentCounts: { [key: string]: number } = {
  positive: 0,
  negative: 0,
  neutral: 0,
};

for (const result of filteredResults) {
  sentimentCounts[result] += 1;
}

// calculating the percentage of each sentiment
const totalResponses = filteredResults.length;

const sentimentPercentages = {
  positive: (sentimentCounts.positive / totalResponses) * 100,
  negative: (sentimentCounts.negative / totalResponses) * 100,
  neutral: (sentimentCounts.neutral / totalResponses) * 100,
};


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
        <div className="mt-10">
            <div className="flex gap-5">
              <BarChart2 size={30} strokeWidth={2} />
              <div className="font-bold text-xl mb-3">Event Timeline</div>
            </div>
          <Charts checkinData={eventStatistics.eventTimeline} />
        </div>

        <div className="mt-10 flex">
        <div className="flex gap-5">
              <MessageSquare size={30} strokeWidth={2} />
              <div className="font-bold text-xl mb-3">Form Insights</div>
            </div>
        </div>

      <FormsBarChart sentimentPercentages={sentimentPercentages} ></FormsBarChart>
      
      <div className="flex justify-between  my-4">
      <Button className=" ml-7" variant={"secondary"} onClick={() => handleClassifyResponses()}>Get Responses Analysis</Button>

      <CSVLink filename={event.name+"_form_responses.csv"} className="bg-white text-black border-2 border-black hover:bg-black hover:text-white text-center p-2 font-semibold text-sm" data={csvData}>Export Foms Data</CSVLink>

      </div>
      </div>
    </>
  );
};

export default EventStatistics;