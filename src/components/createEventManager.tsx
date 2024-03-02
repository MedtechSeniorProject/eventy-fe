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
  import { cn } from "@/lib/utils";

  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
 
  import { useState } from "react";
  import useAuth from "@/_auth/hook/useAuth";
  import { useCreateEventManager } from "@/lib/queries/queries";
  
  const FormSchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(7)
    })
    .required();
  
  const CreateEventManager = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });
    const { user } = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const { mutate, isLoading, error } = useCreateEventManager();

    //TODO handle error : display toast: "unable to create event manager, please try again."

  
    function onSubmit(data: z.infer<typeof FormSchema>) {
      mutate(data);
      form.reset();
      console.log("Event Manager ID: ", user.id);
      console.log(data);
      setOpen(false);
    }
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-5" variant="secondary">
            Add Event manager
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new event manager</DialogTitle>
            <DialogDescription>
              You’re adding a new event manager to the list
            </DialogDescription>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Email Address..."
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
                        placeholder="Enter Password..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant={"secondary"} className="w-20" type="submit">
              {isLoading ? "Loading..." : "Add"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default CreateEventManager;
  