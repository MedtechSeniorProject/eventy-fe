import { useGetEventManagers } from "@/lib/queries/queries";
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect,useState } from "react";
import { getEventManagers } from "@/lib/queries/api";



export default function EventManagersList() {

  const [eventmanager, setEventManagers] = useState([]);

// run the query when page loads
useEffect(() => {
  eventmanagers();
} ,[]);


const eventmanagers = async () => {
  const response = await getEventManagers();
  setEventManagers(response);

}
  return (
    <div className="w-full">
      <DataTable columns={columns} data={eventmanager} />
    </div>
  )
}
