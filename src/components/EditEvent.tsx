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

const FormSchema = z
  .object({
    name: z.string(),
    eventDate: z.date()
  })
  .required();

const EditEvent = ({ ...props }) => {
  const { mutateAsync: updateEvent} = useUpdateEvent()

  function convertToDate(inputDateString: string) {
    const date = parse(inputDateString, 'M/dd/yyyy, hh:mm:ss a', new Date());
    const fDate = toDate(date)
    return fDate;
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: props.event.name,
      eventDate: convertToDate(props.event.time)
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const event: EventUpdateForm = {
      id: props.event.id,
      name: data.name,
      time: formatISO(data.eventDate)
    }
    const response = await updateEvent(event);
    if(!response.ok){
      toast({variant: "destructive", title: "Error"})
      return;
    }
    const eventResponse = await response.json()
    toast({title: "Event Updated Successfully", description:`Event ${eventResponse.name} is updated!`})
    return;
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Event: {props?.event?.name}</DialogTitle>
        <DialogDescription>Youre editing an event</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            name="eventDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Date</FormLabel>
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
          <Button variant={"secondary"} className="w-20" type="submit">
           {form.formState.isSubmitting ? "Loading..." : "Add"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditEvent;
