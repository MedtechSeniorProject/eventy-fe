"use client";
import * as React from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { AlertConfirmation } from "@/components/Alert";
import { useDeleteAttendees } from "@/lib/queries/queries";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  eventId: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  eventId
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const {mutateAsync: RemoveAttendees } = useDeleteAttendees()
  const { toast } = useToast()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  function checkSelectedRows(): boolean{
     return table.getFilteredSelectedRowModel().rows.length == 0
  }

  async function handleRemoveAttendees() {
    const array = table.getFilteredSelectedRowModel().rows
    let attendeeIds: string[] = []
    array.forEach((event: any) => {
      attendeeIds.push(event.original.id)
    })
    const params = {
      eventId: eventId,
      attendeeIds: attendeeIds
    }
    try{
      await RemoveAttendees(params)
      toast({title:"Attendees Removed Successfully", description:"Attendees are removed from the list of the event!"})
    }catch(error){
      console.error('Error:', error)
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        toast({title:"Error", description:"Error has occured while removing the attendees from the list!"})
      } else if (axiosError.request) {
        console.error('No response received:', axiosError.request);
        toast({ variant:"destructive", title: 'Network Error', description: 'Failed to fetch data due to network issue!' });
      } else {
        console.error('Request setup error:', axiosError.message);
        toast({ variant:"destructive", title: 'Request Error', description: 'Failed to setup request!' });
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter attendees..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(attendee) =>
            table.getColumn("name")?.setFilterValue(attendee.target.value)
          }
          className="max-w-sm"
        />
        <AlertConfirmation name="Remove Attendees" disabled={checkSelectedRows()} cta={handleRemoveAttendees} />
      </div>
      <div className="w-full border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
