"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Event } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditEvent from "../../EditEvent";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import { useNavigate } from "react-router-dom";
import { useDeleteEvent, useToggleArchiveEvent } from "@/lib/queries/queries";
import { useToast } from "@/components/ui/use-toast";

export const columns: ColumnDef<Event>[] = [
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
      );
    },
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "eventManager",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Manager
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;
      const { toast } = useToast()
      const navigate = useNavigate()
      const { mutateAsync: toggleArchiveEvent } = useToggleArchiveEvent()
      const { mutateAsync: deleteEvent } = useDeleteEvent()

      const handleToggleArchiveEvent = async(id: string) => {
        const response = await toggleArchiveEvent(id);
        if(!response.ok){
          toast({variant:"destructive", title:"Error", description:"Event failed to archive!"})
          return;
        }
        const data = await response.json()
        toast({title:"Event Archived Successfully", description: `Event ${data.name} is archived!`})
      }

      const handleDeleteEvent = async(id: string) => {
        const response = await deleteEvent(id);
        if(!response.ok){
          toast({variant:"destructive", title:"Error", description:"Event failed to delete!"})
          return;
        }
        toast({title:"Event Deleted Successfully", description: `Event ${event.name} is deleted!`})
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
                <DropdownMenuLabel>{event.name}</DropdownMenuLabel>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit Event Details</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem>Event Insights</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {navigate(`/event/${event.id}/guestlist`)}}>Guests List</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {navigate(`/event/${event.id}/emailtemplate`)}}>Email Template</DropdownMenuItem>
                <DropdownMenuItem>Evaluation Form</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {navigate(`/event/${event.id}/deskagents`)}}>Desk Agents</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleToggleArchiveEvent(event.id)} className="bg-red">
                  Archive Event
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDeleteEvent(event.id)}>Delete Event</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <EditEvent event={event} />
          </Dialog>
        </>
      );
    },
  },
];
