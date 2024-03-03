import { useParams } from "react-router-dom";
import EventHeader from "@/components/EventHeader"
import GuestList from "@/components/events/guestList/page";
import AddAttendee from "@/components/AddAttendee";

const EventGuestList = () => {
  let params = useParams();

  // SEARCH EVENT BY ID
  /** */
  // DUMMY DATA
  const data = {
    name: "Spring Festival",
    time: "Friday, April 5, 2024",
    eventManager: "Amanda Johnson",
  }

  return (
    <div className="p-10 w-full">
      <EventHeader name={data.name} time={data.time} />
      <div className="mt-5">
        <AddAttendee />
      </div>
      <GuestList />
    </div>
  )
}

export default EventGuestList