import Header from "@/components/Header";
import CreateEventManager from "@/components/CreateEventManager";
import EventManagersList from "@/components/eventmanagers/page";
import SEO from "@/components/SEO";

const EventManagers = () => {

  return (
    <>
      <SEO
        title="Eventy - Event Managers"
        description="Event Management System Event Managers Page"
        name="Eventy"
        type="Event Managers" />
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
