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
import { Address, EventUpdateForm } from "@/types/types";
import { toast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { getAddress } from "@/lib/adressapi";

const FormSchema = z
.object({
  name: z.string(),
  startTime: z.date({
    required_error: "A start date is required.",
  }),
  endTime: z.date({
    required_error: "An end date is required.",
  }),
  location: z.string(),
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
  const { mutateAsync: updateEvent} = useUpdateEvent()
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [longitude, setLongitude] = useState<string>("")
  const [latitude, setLatitude] = useState<string>("")

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
      location: props.event.address
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
    
    console.log(event)
    
    const response = await updateEvent(event);
    if(response.status != 200){
      toast({variant: "destructive", title: "Error"})
      return;
    }
    const eventResponse = await response.data
    toast({title: "Event Updated Successfully", description:`Event ${eventResponse.name} is updated!`})
    return;
  }

  async function handleLocationChange(value: string) {
    try {
      setIsLoading(true);
      const response = await getAddress(value);
      const limitedAddresses = response.slice(0, 3);
      console.log(response);
      setAddresses(limitedAddresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="Search..."
                      onChange={(e) => {
                        field.onChange(e);
                        handleLocationChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {isLoading && <div className="text-sm font-semibold">Loading...</div>}
                  {!isLoading && addresses.length > 0 && (
                    <div className="flex flex-col gap-1 border border-1 ">
                      {addresses.map((address) => (
                        <button
                          type="button"
                          className="hover:bg-slate-100 pl-3 transition-all duration-100"
                          key={address.place_id}
                          onClick={(e) => {
                            e.preventDefault()
                            form.setValue("location", address.display_name);
                            setLatitude(address.lat)
                            setLongitude(address.lon)
                            setAddresses([])
                          }}
                        >
                          <p className="text-start text-sm">{address.display_name}</p>
                        </button>
                      ))}
                    </div>
                  )}
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
