import { Event, columns } from "./columns"
import { DataTable } from "./data-table"

const data: Event[] = [
  {
    name: "Event 1",
    time: "Thursday, February 29, 2024",
    eventManager: "Amine Walid",
  },
  {
    name: "Event 2",
    time: "Friday, March 1, 2024",
    eventManager: "John Doe",
  },
  {
    name: "Event 3",
    time: "Saturday, March 2, 2024",
    eventManager: "Jane Smith",
  },
  {
    name: "Event 4",
    time: "Sunday, March 3, 2024",
    eventManager: "Emily Johnson",
  },
  {
    name: "Event 5",
    time: "Monday, March 4, 2024",
    eventManager: "Michael Brown",
  },
  {
    name: "Event 6",
    time: "Tuesday, March 5, 2024",
    eventManager: "Jessica Martinez",
  },
  {
    name: "Event 7",
    time: "Wednesday, March 6, 2024",
    eventManager: "William Davis",
  },
  {
    name: "Event 8",
    time: "Thursday, March 7, 2024",
    eventManager: "Olivia Wilson",
  },
  {
    name: "Event 9",
    time: "Friday, March 8, 2024",
    eventManager: "Ethan Anderson",
  },
  {
    name: "Event 10",
    time: "Saturday, March 9, 2024",
    eventManager: "Sophia Taylor",
  },
  {
    name: "Event 11",
    time: "Sunday, March 10, 2024",
    eventManager: "Daniel Thomas",
  },
];

export default function UpcomingEvents() {

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
