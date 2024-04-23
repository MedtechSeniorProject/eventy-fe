import EvaluationForm from "@/components/EvaluationForm";
import EventHeader from "@/components/EventHeader";
import Loading from "@/components/Loading";
import SEO from "@/components/SEO";
import { useGetEventById } from "@/lib/queries/queries";
import { useParams } from "react-router-dom";

const EventEvaluationForm = () => {

  const { id } = useParams() as { id: string}
  const { data: event, isLoading, isError} = useGetEventById(id)

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !event) {
    return <div>Failed to load Event</div>;
  }

  return (
    <div>
      <SEO
        title="Eventy - Evaluation Form"
        description="Event Management System Evaluation Form Page"
        name="Eventy"
        type="evaluation form" />
      <EventHeader name={"Evaluation Form - " + event.name} time={event.startTime} address={event.address} endTime={event.endTime} />
      <EvaluationForm eventId={id} questions={event.questions} />
    </div>
  )
}

export default EventEvaluationForm;