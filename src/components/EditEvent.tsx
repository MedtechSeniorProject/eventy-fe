import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, formatISO, parse, toDate } from "date-fns";
import { useUpdateEvent } from "@/lib/queries/queries";
import { EventUpdateForm } from "@/types/types";
import { toast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { getAddress } from "@/lib/adressapi";
import { AxiosError } from "axios";
import MapComponent from "./MapComponent";

const FormSchema = z
.object({
  name: z.string(),
  startTime: z.date({
    required_error: "A start date is required.",
  }),
  endTime: z.date({
    required_error: "An end date is required.",
  }),
  location: z
      .object({
        latitude: z.string(),
        longitude: z.string(),
      }),
  address: z.string(),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
})
.required();

const EditEvent = ({ ...props }) => {
  const { mutateAsync: updateEvent} = useUpdateEvent();
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  function convertToDate(inputDateString: string) {
    const date = parse(inputDateString, 'M/dd/yyyy, hh:mm:ss a', new Date());
    const fDate = toDate(date)
    return fDate;
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: props.event.name,
      startTime: convertToDate(props.event.startTime),
      endTime: convertToDate(props.event.endTime),
      description: props.event.description,
      location: {
        latitude: props.event.latitude,
        longitude: props.event.longitude,
      },
      address: props.event.address
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const event: EventUpdateForm = {
      id: props.event.id,
      name: data.name,
      startTime: formatISO(data.startTime),
      endTime: formatISO(data.endTime),
      description: data.description
    }

    if (latitude) {
      event.latitude = latitude;
    }
    
    if (longitude) {
      event.longitude = longitude;
    }

    if (address) {
      event.address = address;
    }
    
    console.log(event)
    
    try {
      const response = await updateEvent(event);
      const eventResponse = await response.data
      toast({title: "Event Updated Successfully", description:`Event ${eventResponse.name} is updated!`})
    } catch (error) {
      console.error("Error:", error);
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        toast({variant: "destructive", title: "Error"})
      } else if (axiosError.request) {
        console.error("No response received:", axiosError.request);
        toast({
          variant: "destructive",
          title: "Network Error",
          description: "Failed to fetch data due to network issue!",
        });
      } else {
        console.error("Request setup error:", axiosError.message);
        toast({
          variant: "destructive",
          title: "Request Error",
          description: "Failed to setup request!",
        });
      }
    }
  }

  async function getAddressFromCoordinates(lat: string, lng: string) {
    let address;
    address = await getAddress(lat.toString(), lng.toString());
    address = address.toString();
    setAddress(address);
  }


  function handleLocationChange(lat: number, lng: number) {
    setLatitude(lat.toString());
    setLongitude(lng.toString());
    getAddressFromCoordinates(lat.toString(), lng.toString());
    //Update the location so that it does not tell me it is required
    form.setValue("location", {
      latitude: lat.toString(),
      longitude: lng.toString(),
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Event: {props?.event?.name}</DialogTitle>
        <DialogDescription>Youre editing an event</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) =>
                        date < new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) =>
                        date < new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="location"
              render={() => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                  <MapComponent
                      handleChange={handleLocationChange}
                      address={address}
                      defaultLatitude={parseFloat(form.getValues("location").latitude)}
                      defaultLongitude={parseFloat(form.getValues("location").longitude)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"secondary"} className="w-20" type="submit">
           {form.formState.isSubmitting ? "Loading..." : "Edit"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditEvent;
