import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react"

interface props{
    name: string
    time: string
    address: string
    endTime: string
}

const EventHeader = (props:props) => {
  const startTime = new Date(props.time);
  const endTime = new Date(props.endTime);
  const formattedStartDateTime = format(startTime, "EEEE, MMMM d, yyyy 'at' h:mm a");
  const formattedEndDateTime = format(endTime, "EEEE, MMMM d, yyyy 'at' h:mm a");

  const navigate = useNavigate();
  function handleClick(): void {
    navigate("/events");
  }
  return (<>

         <Button variant="icon" className="mb-6" size="icon" onClick={() => {handleClick()}}>
      
      <ChevronLeft className="h-8 w-8" />
    </Button>
    <h1 className="font-bold text-3xl">{props.name}</h1>
    <div className='flex gap-2 mt-3'>
      <Clock className='w-4' />
      <p>{formattedStartDateTime}</p>
      <p className='font-bold'>TO</p>
      <p>{formattedEndDateTime}</p>
    </div>
    <div className='flex gap-2'>
      <MapPin className='w-4' />
      <p>Address: {props.address}</p>
    </div>
  </>)
}

export default EventHeader