import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
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
import { ToastAction } from "@/components/ui/toast"
import { cn } from "@/lib/utils";


const FormSchema = z 
  .object({
    numberOfDeskAgents: z.coerce.number({
      required_error: "Number of agents is required",
      invalid_type_error: "Number of agents must be a number",
    }),
  })
  //.refine // add refine for min and max number 

const AddDeskAgent = ({...props}) => {
  const {mutateAsync: addDeskAgent } = useAddDeskAgent() 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { toast } = useToast()
  const [open, setOpen] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = {        
      numberOfDeskAgents: data.numberOfDeskAgents,
      eventId: props.eventId
    }
  try {
    const response = await addDeskAgent(params); 
    if (response.status === 200) {
      const addedDeskAgents = response.data;

      if (Array.isArray(addedDeskAgents)) {
        let message = "";
        for (const agent of addedDeskAgents) {
          message += `- Username: ${agent.username}\n`;
          message += `  Password: ${agent.password}\n\n`;
        }
        /// export data to json --> @sahar TODO: convert json to csv
        const exportData = () => {
          const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(addedDeskAgents)
          )}`;
          const link = document.createElement("a");
          link.href = jsonString;
          link.download = "data.json";
      
          link.click();
        };

        toast({
          className: cn(
            'fixed top-0 left-1/2 -translate-x-1/2 flex justify-center items-center md:max-w-[420px] md:top-4'
          ),
          title: "Desk Agents Added Successfully :\n ",
          description: message,
          action: <ToastAction onClick={exportData} altText="Export Data">Export Data</ToastAction>,
        })
      } else {
        console.error("Unexpected data format in response. Please check API response structure.");
        toast({ title: "Error", description: "An error occurred. Please try again." });
      }
    } else {
      console.error("API call failed with status code:", response.status);
      toast({ title: "Error", description: "An error occurred. Please try again." });
    }

    form.reset();
    setOpen(false);
  } catch (error) {
    toast({ title: 'Error', variant: "destructive", description: "Error" });//TOFIX: display error message
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
            You’re adding new desk agents to this event
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="numberOfDeskAgents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Agents</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="1"
                        type="number"
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
