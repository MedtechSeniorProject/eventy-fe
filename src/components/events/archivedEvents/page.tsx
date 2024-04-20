import { useGetArchivedEvents } from "@/lib/queries/queries";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import Loading from "@/components/Loading";

interface event {
  eventManager: {
    email:string,
    id: string,
    name: string,
    validationCode: string
  },
  id: string,
  name: string,
  startTime: string
  endTime: string
  address:string
  description: string
}

export default function ArchivedEvents() {

  const{ data: rawArchivedEvents = [], isLoading, isError } = useGetArchivedEvents()
  const archivedEvents = rawArchivedEvents.map((event: event) => ({
    id: event.id,
    name: event.name,
    startTime: new Date(event.startTime).toLocaleString(),
    eventManager: event.eventManager?.name || '',
    endTime: new Date(event.endTime).toLocaleString(),
    address: event.address,
    description: event.description
  }));
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>An error has occured !</div>;
  }

  return (
    <div className="w-full">
      <DataTable columns={columns} data={archivedEvents} />
    </div>
  )
}
