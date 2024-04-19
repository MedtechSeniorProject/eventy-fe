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
import { toast as stoast } from 'sonner';

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
import { X } from 'lucide-react';

import { CSVLink } from "react-csv";

const FormSchema = z 
  .object({
    numberOfDeskAgents: z.coerce.number({
      required_error: "Number of agents is required",
      invalid_type_error: "Number of agents must be a number",
    }),
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
      numberOfDeskAgents: data.numberOfDeskAgents,
      eventId: props.eventId
    }
  try {
    const response = await addDeskAgent(params); 
    if (response.status === 200) {
      const addedDeskAgents = response.data;

      if (Array.isArray(addedDeskAgents)) {
        setOpen(false);

        stoast.custom((t) => (
        <div className=" flex flex-col w-96 bg-white text-black bg-background p-2" >
              {/* //x icon */}
               <div className="flex justify-end">
                  <Button variant="icon" size="icon" onClick={() => { stoast.dismiss(t); }}>
                    <X className="ml-auto h-4 w-4" />
                  </Button>
                </div>
          {/* title */}
          <h2 className="font-semibold pt-2 pl-2 pb-3">Desk Agents Added Successfully :</h2>

          <div className="flex flex-col border border-gray-300 border-solid">
          {/* added desk agents */}
          {addedDeskAgents.map((agent, index) => (
            <>
                <div key={index} className="flex flex-row py-3 px-2 w-full">
                  <p className="text-sm"><span className=" font-medium ">Agent {index+1}. username: </span>{agent.username}</p>
                  <p className="text-sm pl-2"><span className=" font-medium">password: </span>{agent.password}</p>
                </div>
                {index === addedDeskAgents.length-1 ? null : <hr />}
                </>
                ))}        
            </div>
            <div className="flex justify-center ">
            <CSVLink filename={"desk_agents_credentials.csv"} className="bg-white text-black border-2 border-black hover:bg-black hover:text-white text-center h-8 py-1 w-32 my-2 font-semibold text-sm" data={addedDeskAgents}>Export CSV</CSVLink>
            </div>
          </div>
        )
        , {
          duration: Infinity,
          position: 'top-center',
          style: {border: '1px solid #a9b1b8', },
        });

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
    <div>
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
    </div>

 
  );
};

export default AddDeskAgent;
