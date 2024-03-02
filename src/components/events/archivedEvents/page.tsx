import { Event, columns } from "./columns"
import { DataTable } from "./data-table"

const data: Event[] = [
  {
    name: "Spring Festival",
    time: "Friday, April 5, 2024",
    eventManager: "Amanda Johnson",
  },
  {
    name: "Tech Conference",
    time: "Saturday, April 6, 2024",
    eventManager: "Chris Roberts",
  },
  {
    name: "Charity Gala",
    time: "Sunday, April 7, 2024",
    eventManager: "Emily Rodriguez",
  },
  {
    name: "Product Launch",
    time: "Monday, April 8, 2024",
    eventManager: "Mark Thompson",
  },
  {
    name: "Music Concert",
    time: "Tuesday, April 9, 2024",
    eventManager: "Sarah White",
  },
  {
    name: "Art Exhibition",
    time: "Wednesday, April 10, 2024",
    eventManager: "Michael Carter",
  },
  {
    name: "Business Summit",
    time: "Thursday, April 11, 2024",
    eventManager: "Jessica Adams",
  },
  {
    name: "Fashion Show",
    time: "Friday, April 12, 2024",
    eventManager: "David Clark",
  },
  {
    name: "Food Festival",
    time: "Saturday, April 13, 2024",
    eventManager: "Sophie King",
  },
  {
    name: "Film Premiere",
    time: "Sunday, April 14, 2024",
    eventManager: "Robert Parker",
  },
  {
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
