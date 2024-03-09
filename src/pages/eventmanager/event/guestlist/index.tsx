import { useParams } from "react-router-dom";
import EventHeader from "@/components/EventHeader"
import GuestList from "@/components/events/guestList/page";
import AddAttendee from "@/components/AddAttendee";
import UploadAttendee from "@/components/UploadAttendee";
import { useGetEventById } from "@/lib/queries/queries";

const EventGuestList = () => {
  const { id } = useParams() as { id: string };
  const { data: event, isLoading, isError } = useGetEventById(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !event) {
    return <div>Error: Failed to load event</div>;
  }

  const attendees = event.attendees || [];

  return (
    <div className="p-10 w-full">
      <EventHeader name={event.name} time={event.time} />
      <div className="mt-5 flex gap-5">
        <AddAttendee eventId={event.id} />
        <UploadAttendee eventId={event.id} />
      </div>
      <GuestList attendees={attendees} eventId={event.id} />
    </div>
  )
}

export default EventGuestList;
