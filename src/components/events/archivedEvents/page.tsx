import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Event } from "@/types/types";

const data:Event[] = [
  {
    id: 20,
    name: "Spring Festival",
    time: "Friday, April 5, 2024",
    eventManager: "Amanda Johnson",
  },
  {
    id: 21,
    name: "Tech Conference",
    time: "Saturday, April 6, 2024",
    eventManager: "Chris Roberts",
  },
  {
    id: 22,
    name: "Charity Gala",
    time: "Sunday, April 7, 2024",
    eventManager: "Emily Rodriguez",
  },
  {
    id: 23,
    name: "Product Launch",
    time: "Monday, April 8, 2024",
    eventManager: "Mark Thompson",
  },
  {
    id: 24,
    name: "Music Concert",
    time: "Tuesday, April 9, 2024",
    eventManager: "Sarah White",
  },
  {
    id: 25,
    name: "Art Exhibition",
    time: "Wednesday, April 10, 2024",
    eventManager: "Michael Carter",
  },
  {
    id: 26,
    name: "Business Summit",
    time: "Thursday, April 11, 2024",
    eventManager: "Jessica Adams",
  },
  {
    id: 27,
    name: "Fashion Show",
    time: "Friday, April 12, 2024",
    eventManager: "David Clark",
  },
  {
    id: 28,
    name: "Food Festival",
    time: "Saturday, April 13, 2024",
    eventManager: "Sophie King",
  },
  {
    id: 29,
    name: "Film Premiere",
    time: "Sunday, April 14, 2024",
    eventManager: "Robert Parker",
  },
  {
    id: 30,
    name: "Book Launch",
    time: "Monday, April 15, 2024",
    eventManager: "Emma Harris",
  },
];


export default function ArchivedEvents() {

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
