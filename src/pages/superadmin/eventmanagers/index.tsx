import Header from "@/components/Header";
import CreateEventManager from "@/components/CreateEventManager";
import EventManagersList from "@/components/eventmanagers/page";

const EventManagers = () => {

  return (
    <>
      <div className="w-11/12">
        <Header name="Events Managers" />
        <div className="mt-8">
        <CreateEventManager />
        <EventManagersList />
        </div>
      </div>
    </>
  );
};

export default EventManagers;
