"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
import { Dialog } from "../../ui/dialog";
import { Event } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { useDeleteEvent, useToggleArchiveEvent } from "@/lib/queries/queries";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { AlertConfirmation } from "@/components/Alert";

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
      const navigate = useNavigate();
      const {toast} = useToast()

      const { mutateAsync: toggleArchiveEvent } = useToggleArchiveEvent()
      const { mutateAsync: deleteEvent } = useDeleteEvent()

      const handleToggleArchiveEvent = async(id: string) => {
        try{
          const response = await toggleArchiveEvent(id);
          const data = await response.data
          toast({title:"Event Listed Successfully", description: `Event ${data.name} is listed on the upcoming events!`})
        }catch(error){
          console.error('Error:', error)
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            toast({variant:"destructive", title:"Error", description:"Event failed to archive!"})
          } else if (axiosError.request) {
            console.error('No response received:', axiosError.request);
            toast({ variant:"destructive", title: 'Network Error', description: 'Failed to fetch data due to network issue!' });
          } else {
            console.error('Request setup error:', axiosError.message);
            toast({ variant:"destructive", title: 'Request Error', description: 'Failed to setup request!' });
          }
        }
      }
      
      const handleDeleteEvent = async(id: string) => {
        try{
          await deleteEvent(id);
          toast({title:"Event Deleted Successfully", description: `Event ${event.name} is deleted!`})
        }catch(error){
          console.error('Error:', error)
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            toast({variant:"destructive", title:"Error", description:"Event failed to delete!"})
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
                <DropdownMenuItem onClick={() => {navigate(`/event/${event.id}/statistics`)}}>Event Insights</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {navigate(`/event/${event.id}/guestlist`)}}>Guests List</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {navigate(`/event/${event.id}/deskagents`)}}>Desk Agents</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleToggleArchiveEvent(event.id)} asChild>
                  <Button className="bg-white text-primary focus:bg-orange-100 focus:text-primary w-full justify-start">Re-list event</Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <AlertConfirmation className="bg-white w-full justify-start text-red-500 hover:bg-red-100" name="Delete" cta={() => handleDeleteEvent(event.id)}/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <EditEvent event={event} />
          </Dialog>
        </>
      );
    },
  },
];
