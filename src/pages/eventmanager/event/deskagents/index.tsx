import EventHeader from "@/components/EventHeader";
import { useGetEventById } from "@/lib/queries/queries";
import { useParams } from "react-router-dom";
import AddDeskAgent from "@/components/AddDeskAgent";
import DeskAgents from "@/components/deskagents/page";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";

const EventDeskAgents = () => {

  const { id } = useParams() as { id: string };
  const { data: event, isLoading, isError } = useGetEventById(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !event) {
    return <div>Error: Failed to load event</div>;
  }

  const deskAgents = event.deskAgents || [];

  return (
    <>
    <SEO
        title="Eventy - Desk Agents"
        description="Event Management System Desk Agents Page"
        name="Eventy"
        type="desk agents" />
    <div className="pb-10 w-11/12">
      <EventHeader name={"Desk Agents - "+event.name} time={event.startTime} address={event.address} endTime={event.endTime}/>
      <div className="mt-5 flex gap-5">
        <AddDeskAgent eventId={event.id} />
      </div>
      <DeskAgents deskAgents={deskAgents} eventId={event.id} /> 
    </div>
    </>
  )
}

export default EventDeskAgents