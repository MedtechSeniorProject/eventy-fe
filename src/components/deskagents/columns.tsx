"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeskAgentsDisplay } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "../ui/use-toast";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import EditEventManager from "../EditEventManager";
import { useDeleteDeskAgent } from "@/lib/queries/queries";
import EditDeskAgent from "../EditDeskAgent";

export const columns: ColumnDef<DeskAgentsDisplay>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const deskAgent = row.original;
      const { toast } = useToast();
      
      const { mutateAsync: deleteDeskAgent } = useDeleteDeskAgent();

      const handleDeleteEventManager = async (id: string) => {
        try{
          const response = await deleteDeskAgent(id);
          toast({title: "Deleted Successfully", description: `Desk agent ${deskAgent.username} has been deleted from this event !`})
        }catch(error){
          toast({title: "Error", description: `An error has occured while deleting the desk agent from this event!`})
        }
      };
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{deskAgent.username}</DropdownMenuLabel>

              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
                </DialogTrigger>
                <EditDeskAgent deskAgent={deskAgent} />
              </Dialog>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  handleDeleteEventManager(deskAgent.id);
                }}
                className="text-red"
              >
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
