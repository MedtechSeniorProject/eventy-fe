import { useGetEventManagers } from "@/lib/queries/queries";
import {  columns } from "./columns"
import { DataTable } from "./data-table"
import SkeletonTable from "../SkeletonTable";

export default function EventManagersList() {

const { data, isError, isLoading } = useGetEventManagers();


if (isError) return <div>woops there was an error</div>;
if (isLoading) return <SkeletonTable />;

  return (
    <div className="w-full">
            <DataTable columns={columns} data={data || []} />
    </div>
  )
}
