import { Button } from "./ui/button"
import { useSendForm } from "@/lib/queries/queries";
import { useToast } from "./ui/use-toast";

interface SendFormProps {
     eventId: string;
}

const SendForm = ({eventId}: SendFormProps) => {

  const { toast } = useToast();
  const { mutateAsync } = useSendForm();

  const handleSendForm = async (eventId: string) => {
  try {
    await mutateAsync(eventId);

      toast({ title: "Forms Sent Successfully", description: "All Forms have been sent to the invitees who checked in!" });
    
  } catch (error) {
    const errormsg = error as Error;

    toast({ variant: "destructive", title: "Error", description: errormsg.message });
  }
};



  return (
    <Button className=" mt-5" variant={"secondary"} onClick={() => handleSendForm(eventId)}>Send Form</Button>
  )

}

export default SendForm