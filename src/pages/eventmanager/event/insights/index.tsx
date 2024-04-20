import Charts from "@/components/Charts";
import { FormsBarChart } from "@/components/FormsBarChart";
import EventHeader from "@/components/EventHeader";
import Loading from "@/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetEventById, useGetEventStatistics,useAttendeesByEvent } from "@/lib/queries/queries";
import { Percent, User } from "lucide-react";
import { CSVLink } from "react-csv";
import { useParams } from "react-router-dom";

const EventStatistics = () => {
  const { id } = useParams() as { id: string };
  const { data: event } = useGetEventById(id);
  const { data: attendees } = useAttendeesByEvent(id);
  console.log("AAAAAAAAAAAAAA attendee: ", attendees,"doneeeee");

  // console.log(attendees);
  
  const {
    data: eventStatistics,
    isLoading: isStatisticsLoading,
    isError: isStatisticsError,
  } = useGetEventStatistics(id);

  if (isStatisticsLoading) {
    return <Loading />;
  }

  if (isStatisticsError || !eventStatistics) {
    return <div>Error: Failed to load event</div>;
  }
  console.log(eventStatistics);


  // const attendeesWithResponses = attendees.filter(
  //   (attendee) => attendee.responses && attendee.responses.length > 0
  // )
  // .map((attendee) => attendee.responses);

  // console.log(attendeesWithResponses);

  return (
    <>
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
      <FormsBarChart></FormsBarChart>
      <CSVLink filename={"desk_agents_credentials.csv"} className="bg-white text-black border-2 border-black hover:bg-black hover:text-white text-center h-8 py-1 w-32 my-2 font-semibold text-sm" data={"attendees"}>Export CSV</CSVLink>

      </div>
    </>
  );
};

export default EventStatistics;