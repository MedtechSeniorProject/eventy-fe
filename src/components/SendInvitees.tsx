import { Button } from "./ui/button"
import { useSendInvitees } from "@/lib/queries/queries";
import { useToast } from "./ui/use-toast";

interface SendInviteesProps {
    eventId: string;
}

const SendInvitees = ({eventId}: SendInviteesProps) => {

  const { toast } = useToast();
  const {mutateAsync} = useSendInvitees();
  const handleSendInvitees = async (eventId: string) => {
    // Send invitees
    try{
        await mutateAsync(eventId);
        toast({title:"Invitees Sent Successfully"});
    }catch(error){
        const errormsg = error as Error;
        toast({variant:"destructive",title:"Error", description: errormsg.message});
    }
  }

  return (
    <Button variant={"secondary"} onClick={() => handleSendInvitees(eventId)}>Send Invitees</Button>
  )
}

export default SendInvitees