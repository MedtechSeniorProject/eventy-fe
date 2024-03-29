import EventHeader from "@/components/EventHeader"
import LoadingSpinner from "@/components/Loading"
import SendInvitees from "@/components/SendInvitees"
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
    return <LoadingSpinner />;
  }

  if (isError || !event) {
    return <div>Error: Failed to load event</div>;
  }

  return (
    <>
        <div className="py-10 w-11/12">
        <EventHeader name={"Email template - " + event.name} time={event.startTime} address={event.address} endTime={event.endTime}/>
            <Editor value={value} setValue={setValue} eventId={id} />
            <SendInvitees eventId={id}/>
        </div>
    </>
  )
}

export default EventEmailTemplate