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
import { Dialog, DialogTrigger } from "../ui/dialog";
import EditEventManager from "../EditEventManager";
import { useDeleteEventManager } from "@/lib/queries/queries";
import { useToast } from "../ui/use-toast";
import { EventManagerUpdateForm } from "@/types/types";
import { AxiosError } from "axios";

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
      );
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
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const eventManager = row.original;
      const { toast } = useToast();
      const { mutateAsync: deleteEventManager } = useDeleteEventManager();

      const handleDeleteEventManager = async (id: string) => {
        try{
          const response = await deleteEventManager(id);
          toast({
            title: "Event Manager Deleted Successfully",
            description: `Event Manager ${eventManager.name} is deleted!`,
          });
  
        }catch(error){
          console.error('Error:', error)
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Event Manager failed to delete!",
            });
          } else if (axiosError.request) {
            console.error('No response received:', axiosError.request);
            toast({ variant:"destructive", title: 'Network Error', description: 'Failed to fetch data due to network issue!' });
          } else {
            console.error('Request setup error:', axiosError.message);
            toast({ variant:"destructive", title: 'Request Error', description: 'Failed to setup request!' });
          }
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
              <DropdownMenuLabel>{eventManager.name}</DropdownMenuLabel>

              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
                </DialogTrigger>
                <EditEventManager eventManager={eventManager} />
              </Dialog>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  handleDeleteEventManager(eventManager.id);
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
