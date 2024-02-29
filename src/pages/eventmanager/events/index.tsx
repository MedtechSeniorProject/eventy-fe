import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingEvents from "@/components/upcomingEvents/page";

const Events = () => {

  return (
    <>
      <div className="p-10 w-full">
        <Header name="Events" />
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
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Events;
