import Charts from "@/components/Charts";
import SkeletonTable from "@/components/SkeletonTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetEventById, useGetEventStatistics } from "@/lib/queries/queries";
import { Percent, User } from "lucide-react";
import { useParams } from "react-router-dom";

const EventStatistics = () => {
  const { id } = useParams() as { id: string };
  const { data: event } = useGetEventById(id);
  const {
    data: eventStatistics,
    isLoading: isStatisticsLoading,
    isError: isStatisticsError,
  } = useGetEventStatistics(id);

  if (isStatisticsLoading) {
    return <SkeletonTable />;
  }

  if (isStatisticsError || !eventStatistics) {
    return <div>Error: Failed to load event</div>;
  }
  console.log(eventStatistics);

  return (
    <>
      <div className="mt-10 w-10/12">
        <div className="font-bold text-2xl">Statistics - {event?.name}</div>
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
      </div>
    </>
  );
};

export default EventStatistics;