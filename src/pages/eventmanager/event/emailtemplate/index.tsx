import EventHeader from "@/components/EventHeader"
import Loading from "@/components/Loading"
import Editor from "@/components/events/Editor"
import { useGetEventById } from "@/lib/queries/queries"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const EventEmailTemplate = () => {

  const { id } = useParams() as { id: string}
  const { data: event, isLoading, isError} = useGetEventById(id)
  const [value, setValue] = useState(event?.emailTemplate || "");

  useEffect(() => {
    setValue(event?.emailTemplate)
  },[isLoading])

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !event) {
    return <div>Error: Failed to load event</div>;
  }

  return (
    <>
        <div className="pb-10 w-11/12">
        <EventHeader name={"Email template - " + event.name} time={event.startTime} address={event.address} endTime={event.endTime}/>
            <Editor value={value} setValue={setValue} eventId={id} />
        </div>
    </>
  )
}

export default EventEmailTemplate