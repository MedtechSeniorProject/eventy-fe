import { useParams } from "react-router-dom";
import EventHeader from "@/components/EventHeader"
import GuestList from "@/components/events/guestList/page";
import AddAttendee from "@/components/AddAttendee";
import UploadAttendee from "@/components/UploadAttendee";
import { useGetEventById } from "@/lib/queries/queries";
import { useEffect, useState } from "react";
import { EventAttendees } from "@/types/types";

const EventGuestList = () => {
  const {mutateAsync: getEventById, isLoading, isError } = useGetEventById()
  const [event, setEvent] = useState<EventAttendees>({
    id: "",
    name: "",
    time:"",
    attendees: []
  })
  let params = useParams();

  useEffect(() => {
    const fetchEvent = async() => {
      const response = await getEventById(params.id || "")
      const responseData = await response.json()
      console.log(responseData)
      setEvent(responseData)
    }
    fetchEvent();
  }, [params.id, getEventById])

  if(isLoading){
    return <div>Loading...</div>
  }

  if(isError){
    return <div>An error has occurred...</div>
  }

  return (
    <div className="p-10 w-full">
      <EventHeader name={event.name} time={event.time} />
      <div className="mt-5 flex gap-5">
        <AddAttendee />
        <UploadAttendee />
      </div>
      <GuestList attendees={event.attendees} />
    </div>
  )
}

export default EventGuestList;
