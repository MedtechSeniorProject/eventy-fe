import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatISO } from "date-fns";
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
import { useState } from "react";
import { useCreateEvent } from "@/lib/queries/queries";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
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
      })
      .refine((value) => value.latitude && value.longitude, {
        message: "Location is required.",
      }),
    description: z
      .string()
      .min(10, {
        message: "Description must be at least 10 characters.",
      })
      .max(160, {
        message: "Description must not be longer than 160 characters.",
      }),
  })
  .required();

const CreateEvent = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [open, setOpen] = useState<boolean>(false);
  const { mutateAsync: createEvent } = useCreateEvent();
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [address, setAddress] = useState<string>("");

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

  async function getAddressFromCoordinates(lat: string, lng: string) {
    let address;
    address = await getAddress(lat.toString(), lng.toString());
    address = address.toString();
    setAddress(address);
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Formatting Date Time
    let startTimeString = formatISO(data.startTime);
    let endTimeString = formatISO(data.endTime);

    const event = {
      name: data.name,
      startTime: startTimeString,
      endTime: endTimeString,
      description: data.description,
      latitude: latitude,
      longitude: longitude,
      address: address,
    };

    try {
      await createEvent(event);
      form.reset();
      setOpen(false);
      toast({
        title: "Event added successfully",
        description: `Event: ${data.name} is added to the upcoming events !`,
      });
    } catch (error) {
      console.error("Error:", error);
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error has occured with the event",
        });
        form.reset();
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-5" variant="secondary">
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new event</DialogTitle>
          <DialogDescription>
            You’re adding a new event to the list
          </DialogDescription>
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
                        disabled={(date) => date < new Date()}
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
                        disabled={(date) => date < new Date()}
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
                      placeholder="Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"secondary"}
              className="w-20"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Loading..." : "Add"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEvent;
