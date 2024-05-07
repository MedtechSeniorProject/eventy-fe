import { useParams } from "react-router-dom";
import EventHeader from "@/components/EventHeader"
import GuestList from "@/components/events/guestList/page";
import AddAttendee from "@/components/AddAttendee";
import UploadAttendee from "@/components/UploadAttendee";
import { useGetEventById } from "@/lib/queries/queries";
import SendInvitees from "@/components/SendInvitees";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";

const EventGuestList = () => {
  const { id } = useParams() as { id: string };
  const { data: event, isLoading, isError } = useGetEventById(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !event) {
    return <div>Error: Failed to load event</div>;
  }

  const attendees = event.attendees || [];
  console.log(attendees)

  return (
    <>
    <SEO
        title="Eventy - Guest List"
        description="Event Management System Guest List Page"
        name="Eventy"
        type="guest list" />
    
    <div className="pb-10 w-11/12">
      <EventHeader name={"Guest List - " + event.name} time={event.startTime} address={event.address} endTime={event.endTime}/>
      <div className="mt-5 flex justify-between">
        <div className="flex gap-5">
          <AddAttendee eventId={event.id} />
          <UploadAttendee eventId={event.id} />
        </div>
        <SendInvitees eventId={event.id}/>
      </div>
      <GuestList attendees={attendees} eventId={event.id} />
    </div>
    </>
  )
}

export default EventGuestList;
