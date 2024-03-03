import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Attendee } from "@/types/types";

const data:Attendee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    addedBy: "Alice",
    attended: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    addedBy: "Bob",
    attended: false,
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    addedBy: "Alice",
    attended: true,
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@example.com",
    addedBy: "Bob",
    attended: false,
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    addedBy: "Alice",
    attended: true,
  },
  {
    id: 6,
    name: "Sarah Taylor",
    email: "sarah@example.com",
    addedBy: "Bob",
    attended: false,
  },
  {
    id: 7,
    name: "Christopher Lee",
    email: "chris@example.com",
    addedBy: "Alice",
    attended: true,
  },
  {
    id: 8,
    name: "Olivia Moore",
    email: "olivia@example.com",
    addedBy: "Bob",
    attended: false,
  },
  {
    id: 9,
    name: "Daniel White",
    email: "daniel@example.com",
    addedBy: "Alice",
    attended: true,
  },
  {
    id: 10,
    name: "Emma Davis",
    email: "emma@example.com",
    addedBy: "Bob",
    attended: false,
  },
];



export default function GuestList() {

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
