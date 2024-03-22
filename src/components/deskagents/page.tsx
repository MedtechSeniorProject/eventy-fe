import { columns } from "./columns"
import { DataTable } from "./data-table"


export default function DeskAgents({...props}) {
  
  return (
    <div className="w-full">
      <DataTable columns={columns} data={props.deskAgents} />
    </div>
  )
}
