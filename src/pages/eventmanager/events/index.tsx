import CreateEvent from "@/components/CreateEvent";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingEvents from "@/components/events/upcomingEvents/page";
import ArchivedEvents from "@/components/events/archivedEvents/page";

const Events = () => {

  return (
    <>
      <div className="w-11/12">
        <Header name="Events" />
        <CreateEvent />
        <div className="mt-10">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <UpcomingEvents />
            </TabsContent>
            <TabsContent value="archived">
              <ArchivedEvents />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Events;
