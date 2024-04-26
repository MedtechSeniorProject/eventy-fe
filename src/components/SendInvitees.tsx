import { useSendInvitees } from "@/lib/queries/queries";
import { useToast } from "./ui/use-toast";
import { AlertConfirmation } from "./Alert";

interface SendInviteesProps {
  eventId: string;
}

const SendInvitees = ({ eventId }: SendInviteesProps) => {
  const { toast } = useToast();
  const { mutateAsync } = useSendInvitees();
  const handleSendInvitees = async (eventId: string) => {
    try {
      await mutateAsync(eventId);
      toast({ title: "Invitees Sent Successfully" });
    } catch (error) {
      const errormsg = error as Error;
      toast({
        variant: "destructive",
        title: "Error",
        description: errormsg.message,
      });
    }
  };

  return (
    <>
      <AlertConfirmation
        title="Confirm Email Invitations"
        description="Please confirm your action to send email invitations to event attendees. This step will ensure that all guests receive their invitations promptly and accurately. By confirming, you affirm that the event details are correct and that you wish to proceed with sending invitations."
        className="border-2 border-black bg-white text-black hover:text-white"
        name="Send Invitees"
        cta={() => handleSendInvitees(eventId)}
      />
    </>
  );
};

export default SendInvitees;
