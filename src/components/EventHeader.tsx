import { format } from 'date-fns';

interface props{
    name: string
    time: string
}

const EventHeader = (props:props) => {
  const dateTime = new Date(props.time);
  const formattedDateTime = format(dateTime, "EEEE, MMMM d, yyyy 'at' h:mm a");
  return (<>
    <h1 className="font-bold text-3xl">{props.name}</h1>
    <p>{formattedDateTime}</p>
  </>)
}

export default EventHeader