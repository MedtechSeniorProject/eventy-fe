import Header from "@/components/Header";
import EventManagersList from "@/components/eventmanagers/page";

const EventManagers = () => {

  return (
    <>
      <div className="p-10 w-full">
        <Header name="Events Managers" />
        <div className="mt-10">
        <EventManagersList />
        </div>
      </div>
    </>
  );
};

export default EventManagers;
