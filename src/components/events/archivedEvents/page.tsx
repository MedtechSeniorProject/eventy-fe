import { useGetArchivedEvents } from "@/lib/queries/queries";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import SkeletonTable from "@/components/SkeletonTable";

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

export default function ArchivedEvents() {

  const{ data: rawArchivedEvents = [], isLoading, isError } = useGetArchivedEvents()
  const archivedEvents = rawArchivedEvents.map((event: event) => ({
    id: event.id,
    name: event.name,
    time: new Date(event.time).toLocaleString(),
    eventManager: event.eventManager?.name || ''
  }));
  if (isLoading) {
    return <SkeletonTable />;
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
