import useAuth from "@/_auth/hook/useAuth";
import Header from "@/components/Header";
import { useGetEventManagerStatistics } from "@/lib/queries/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal, Percent, Trophy, User } from "lucide-react";
import DonutChart from "@/components/DonutChart";
import Loading from "@/components/Loading";

const EmStatistics = () => {
  const { user } = useAuth();
  const startTime = "1970-01-01";
  const endTime = "2024-12-31";
  const { isLoading, isError, data } = useGetEventManagerStatistics(
    user.id,
    startTime,
    endTime
  );
  console.log(data)

  if (isLoading) {
    return <Loading />;
  }

  if (isError || data == undefined) {
    return (
      <div
        style={{ height: "80vh" }}
        className="w-10/12 flex items-center justify-center"
      >
        <p className="font-semibold">Error: Failed to load statistics</p>
      </div>
    );
  }

  const averageAttendanceRate: string = data?.averageAttendanceRate?.toString()?.substring(0,5);
  
  return (
    <>
      <div className="w-10/12 -z-0">
        <Header name="Statistics" />

        {/**Average Attendance Rate Donut Chart */}
        <div className="flex mt-5 items-center justify-around border py-3 border-slate-200">
          <div>
            <div className="text-primary font-medium">Average Attendance Rate</div>
            <div className="bg-orange-100 w-fit px-3 py-2 mt-2">
              <div className="text-center text-primary font-bold text-2xl">{averageAttendanceRate} %</div>
            </div>
          </div>
          <DonutChart data={averageAttendanceRate} />
        </div>

        {/**Statistics */}
        <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Invitees
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.numberOfInvitees}</div>
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
              <div className="text-2xl font-bold">{data?.numberOfAttendees}</div>
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
              <div className="text-2xl font-bold">{data?.onSpotAttendees}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Number of Events
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.numberOfEvents}</div>
            </CardContent>
          </Card>
        </div>

        {/**Best Events */}
        <div className="mb-10">
          <div className="flex flex-row gap-2 mt-8 items-center border-b justify-center border-black py-2">
            <Trophy className="h-6 w-6 " />
            <div className="font-bold text-2xl">Events Ranking</div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {data.top3EventsByNumberOfAttendees.map(
              (event: {
                name: string;
                id: string;
                numberOfAttendees: string;
              }, index: number) => {
                return (
                  <Card key={index} className="hover:cursor-pointer hover:border-primary">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-md font-medium flex items-center justify-between w-full">
                        <div className="bg-orange-100 py-1 px-2 rounded-full ">
                          <span className="text-primary text-lg font-bold">#{index + 1}</span>
                        </div>
                        <div>{index == 0 && "First"} {index == 1 && "Second"} {index == 2 && "Third"} Winner</div>
                        <Medal className="h-6 w-6 text-primary" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                      {event?.name}
                      </div>
                      <div className="my-3 h-0.5 w-full bg-slate-100 rounded-lg"></div>
                      <div className="font-medium text-slate-600 text-sm">
                        <span className="text-primary font-bold text-lg">{event?.numberOfAttendees}</span> Attendees</div>
                  </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </div>

        
      </div>
    </>
  );
};

export default EmStatistics;
