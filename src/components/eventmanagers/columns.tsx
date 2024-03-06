"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "../ui/dialog"
import EditEventManager from "../EditEventManager"
import { useDeleteEventManager } from "@/lib/queries/queries"
import { useToast } from "../ui/use-toast"
import { EventManagerUpdateForm } from "@/types/types"

export const columns: ColumnDef<EventManagerUpdateForm>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const eventManager = row.original
      const { toast } = useToast()
      const { mutateAsync: deleteEventManager } = useDeleteEventManager()

      const handleDeleteEventManager = async(id: string) => {
        const response = await deleteEventManager(id);
        if(!response.ok){
          toast({variant:"destructive", title:"Error", description:"Event failed to delete!"})
          return;
        }
        toast({title:"EventManager Deleted Successfully", description: `Event ${eventManager.name} is deleted!`})
      }
 
      return (
        <>
        <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{eventManager.name}</DropdownMenuLabel>
            <DialogTrigger asChild>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {handleDeleteEventManager(eventManager.id)}} className="text-red">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <EditEventManager eventManager={eventManager} />
        </Dialog>
        </>
      )
    },
  },
]
