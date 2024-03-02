import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Event } from "@/types/types";

const data: Event[] = [
  { 
    id: 1,
    name: "Event 1",
    time: "Thursday, February 29, 2024",
    eventManager: "Amine Walid",
  },
  {
    id: 2,
    name: "Event 2",
    time: "Friday, March 1, 2024",
    eventManager: "John Doe",
  },
  {
    id: 3,
    name: "Event 3",
    time: "Saturday, March 2, 2024",
    eventManager: "Jane Smith",
  },
  {
    id: 4,
    name: "Event 4",
    time: "Sunday, March 3, 2024",
    eventManager: "Emily Johnson",
  },
  {
    id: 5,
    name: "Event 5",
    time: "Monday, March 4, 2024",
    eventManager: "Michael Brown",
  },
  {
    id: 6,
    name: "Event 6",
    time: "Tuesday, March 5, 2024",
    eventManager: "Jessica Martinez",
  },
  {
    id: 7,
    name: "Event 7",
    time: "Wednesday, March 6, 2024",
    eventManager: "William Davis",
  },
  {
    id: 8,
    name: "Event 8",
    time: "Thursday, March 7, 2024",
    eventManager: "Olivia Wilson",
  },
  {
    id: 9,
    name: "Event 9",
    time: "Friday, March 8, 2024",
    eventManager: "Ethan Anderson",
  },
  {
    id: 10,
    name: "Event 10",
    time: "Saturday, March 9, 2024",
    eventManager: "Sophia Taylor",
  },
  {
    id: 11,
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
