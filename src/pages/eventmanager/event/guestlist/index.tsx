import { useParams } from "react-router-dom";

const EventGuestList = () => {
  let params = useParams();

  return (
    <div>{params.eventId}</div>
  )
}

export default EventGuestList