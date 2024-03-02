import { Button } from "./ui/button"

interface props{
    name: string
    time: string
}

const EventHeader = (props:props) => {

  return (<>
    <h1 className="font-bold text-3xl">{props.name}</h1>
    <p>{props.time}</p>
    <div className="mt-5 flex justify-between">
      <div className="flex gap-5">
        <Button variant={"default"}>Add Attendee</Button>
        <Button variant={"secondary"}>Upload Excel File</Button>
      </div>
      <Button disabled={true} variant={"ghost"}>Remove Attendee</Button>
    </div>
  </>)
}

export default EventHeader