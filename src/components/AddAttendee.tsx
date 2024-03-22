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
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { useState } from "react";
import { useAddAttendees } from "@/lib/queries/queries";
import { AddAttendees, AttendeeForm } from "@/types/types";
import { useToast } from "./ui/use-toast";
import { AxiosError } from "axios";
  
  const FormSchema = z
    .object({
      name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      }),
      email: z.string().email()
    })
  
  const AddAttendee = ({...props}) => {
    const {mutateAsync: addAttendees } = useAddAttendees()
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });
    const { toast } = useToast()
    const [open, setOpen] = useState<boolean>(false);
  
    async function onSubmit(data: z.infer<typeof FormSchema>) {
      const attendee: AttendeeForm[] = [
        {
          name: data.name,
          email: data.email
        }
      ]
      const params: AddAttendees = {
        eventId: props.eventId,
        attendees: attendee
      }
      
      try{
        const response = await addAttendees(params)
        toast({title:"Attendee Added Successfully", description: `${attendee[0].name} is added to the guest list!`})
        form.reset();
        setOpen(false)
      }catch(error){
        console.error('Error:', error)
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          toast({ variant:"destructive", title: 'Error', description: 'Error has occured while adding attendees!' });
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">
            Add Attendee
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Attendee</DialogTitle>
            <DialogDescription>
              You’re adding a new attendee to this event
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Email"
                      />
                    </FormControl>
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
      </Dialog>
    );
  };
  
  export default AddAttendee;
  