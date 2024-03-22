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
import {  useAddDeskAgent } from "@/lib/queries/queries";
import { useToast } from "./ui/use-toast";
  
  const FormSchema = z
    .object({
      username: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
      .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
        message: 'Username must not contain special characters',
      }),
      password: z.string().min(7),
      confirmPassword: z.string().min(7)
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })
  
  const AddDeskAgent = ({...props}) => {
    const {mutateAsync: addDeskAgent } = useAddDeskAgent() 
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });
    const { toast } = useToast()
    const [open, setOpen] = useState<boolean>(false);
  
    async function onSubmit(data: z.infer<typeof FormSchema>) {
      const params = {
        username: data.username,
        password: data.password,
        eventId: props.eventId
      }
      try{
        const response = await addDeskAgent(params)
        toast({title:"Desk Agent Added Successfully", description: `${data.username} is added to the desk agents list!`})
        form.reset();
        setOpen(false)
      } catch(error){
        toast({ title: 'Error', variant:"destructive", description: 'Desk agent should have unique credentials!' });
      }
    }
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">
            Add Desk Agent
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Desk Agent</DialogTitle>
            <DialogDescription>
              You’re adding a new desk agent to this event
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Password"
                        type="password"
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
  
  export default AddDeskAgent;
  