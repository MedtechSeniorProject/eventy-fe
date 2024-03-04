import { useGetUpcomingEvents } from "@/lib/queries/queries";
import { columns } from "./columns"
import { DataTable } from "./data-table"


interface event {
  eventManager: {
    email:string,
    id: string,
    name: string,
    validationCode: string
  },
  id: string,
  name: string,
  time: string
}

export default function UpcomingEvents() {

  const{ data: rawUpcomingEvents = [], isLoading, isError } = useGetUpcomingEvents()
  const upcomingEvents = rawUpcomingEvents.map((event: event) => ({
    id: event.id,
    name: event.name,
    time: new Date(event.time).toLocaleString(),
    eventManager: event.eventManager?.name || ''
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error has occured !</div>;
  }

  return (
    <div className="w-full">
      <DataTable columns={columns} data={upcomingEvents} />
    </div>
  )
}
