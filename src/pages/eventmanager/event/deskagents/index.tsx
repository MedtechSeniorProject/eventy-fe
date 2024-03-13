import { useParams } from "react-router-dom";

const EventDeskAgents = () => {

  const { id } = useParams() as { id: string };

  return (
    <>
      <div className="p-10 w-full">
        <div>Desk Agents</div>
      </div>
    </>
  )
}

export default EventDeskAgents