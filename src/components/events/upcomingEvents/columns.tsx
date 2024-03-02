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
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
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
      const navigate = useNavigate()

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
                <DropdownMenuItem>Email Template</DropdownMenuItem>
                <DropdownMenuItem>Evaluation Form</DropdownMenuItem>
                <DropdownMenuItem>Desk Agents</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red">
                  Archive Event
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
