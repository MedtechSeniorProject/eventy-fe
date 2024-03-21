import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
import { useUpdateEventManager } from "@/lib/queries/queries";
import { EventManagerUpdateForm } from "@/types/types";
import { useToast } from "./ui/use-toast";
  
  const FormSchema = z
    .object({
      name: z.string(),
      email: z.string().email()
    })
    .required();
  
  const EditEventManager = ({ ...props }) => {
    const {mutateAsync: updateEventManager } = useUpdateEventManager()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        name: props.eventManager.name,
        email: props.eventManager.email
      },
    });
  
    async function onSubmit(data: z.infer<typeof FormSchema>) {
      const eventManager: EventManagerUpdateForm = {
        id: props.eventManager.id,
        name: data.name,
        email: data.email
      }
      const response = await updateEventManager(eventManager)
      if(response.status != 200){
        toast({variant: "destructive", title: "Error"})
        return;
      }
      const eventResponse = await response.data
      toast({title: "EventManager Updated Successfully", description:`Event ${eventResponse.name} is updated!`})
      return;
    }
    
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event Manager: {props?.eventManager?.name}</DialogTitle>
          <DialogDescription>Youre editing event manager details</DialogDescription>
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
    );
  };
  
  export default EditEventManager;