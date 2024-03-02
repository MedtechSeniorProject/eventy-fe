import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Attendee } from "@/types/types";

const data:Attendee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "123-456-7890",
    addedBy: "Alice",
    attended: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phoneNumber: "456-789-0123",
    addedBy: "Bob",
    attended: false,
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    phoneNumber: "789-012-3456",
    addedBy: "Alice",
    attended: true,
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@example.com",
    phoneNumber: "012-345-6789",
    addedBy: "Bob",
    attended: false,
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@example.com",
    phoneNumber: "345-678-9012",
    addedBy: "Alice",
    attended: true,
  },
  {
    id: 6,
    name: "Sarah Taylor",
    email: "sarah@example.com",
    phoneNumber: "678-901-2345",
    addedBy: "Bob",
    attended: false,
  },
  {
    id: 7,
    name: "Christopher Lee",
    email: "chris@example.com",
    phoneNumber: "901-234-5678",
    addedBy: "Alice",
    attended: true,
  },
  {
    id: 8,
    name: "Olivia Moore",
    email: "olivia@example.com",
    phoneNumber: "234-567-8901",
    addedBy: "Bob",
    attended: false,
  },
  {
    id: 9,
    name: "Daniel White",
    email: "daniel@example.com",
    phoneNumber: "567-890-1234",
    addedBy: "Alice",
    attended: true,
  },
  {
    id: 10,
    name: "Emma Davis",
    email: "emma@example.com",
    phoneNumber: "890-123-4567",
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
