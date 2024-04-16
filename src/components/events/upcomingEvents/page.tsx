import { useGetUpcomingEvents } from "@/lib/queries/queries";
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
  startTime: string
  endTime: string
  latitude: number
  longitude: number
  address:string
  description: string
}

export default function UpcomingEvents() {

  const{ data: rawUpcomingEvents = [], isLoading, isError } = useGetUpcomingEvents()
  const upcomingEvents = rawUpcomingEvents.map((event: event) => ({
    id: event.id,
    name: event.name,
    startTime: new Date(event.startTime).toLocaleString(),
    eventManager: event.eventManager?.name || '',
    endTime: new Date(event.endTime).toLocaleString(),
    latitude: event.latitude,
    longitude: event.longitude,
    address: event.address,
    description: event.description
  }));

  if (isLoading) {
    return <SkeletonTable />;
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
