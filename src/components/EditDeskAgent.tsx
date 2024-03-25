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
import { useEditDeskAgent } from "@/lib/queries/queries";
import { toast } from "./ui/use-toast";

const FormSchema = z
  .object({
    username: z.string(),
  })
  .required();

const EditDeskAgent = ({ ...props }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: props.deskAgent?.username
    },
  });
  const { mutateAsync: editDeskAgent} = useEditDeskAgent()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const deskAgent = {
        id: props.deskAgent.id,
        username: data.username
    }

    try{
        await editDeskAgent(deskAgent)
        toast({title:"Edited Successfully", description: `Desk Agent ${data.username} has been updated!`})
    }catch(error){
        toast({variant:"destructive", title:"Error", description:"Error while updating the desk agent!"})
    }

  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Edit Desk Agent: {props?.deskAgent?.username}
        </DialogTitle>
        <DialogDescription>
          Youre editing desk agent details
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
          <Button variant={"secondary"} className="w-20" type="submit">
            {form.formState.isSubmitting ? "Loading..." : "Save"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditDeskAgent;
