import EventHeader from "@/components/EventHeader"
import LoadingSpinner from "@/components/Loading"
import Editor from "@/components/events/Editor"
import { useGetEventById } from "@/lib/queries/queries"
import { useParams } from "react-router-dom"

const EventEmailTemplate = () => {

  const { id } = useParams() as { id: string}
  const { data: event, isLoading, isError} = useGetEventById(id)

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !event) {
    return <div>Error: Failed to load event</div>;
  }

  return (
    <>
        <div className="p-10 w-11/12">
            <EventHeader name={"Email Template - " + event.name} time={event.time} />
            <Editor />
        </div>
    </>
  )
}

export default EventEmailTemplate