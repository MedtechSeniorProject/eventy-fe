import { columns } from "./columns"
import { DataTable } from "./data-table"


export default function GuestList({...props}) {

  return (
    <div className="w-full">
      <DataTable columns={columns} data={props.attendees} />
    </div>
  )
}
