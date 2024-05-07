import { useSendForm } from "@/lib/queries/queries";
import { useToast } from "./ui/use-toast";
import { AlertConfirmation } from "./Alert";

interface SendFormProps {
  eventId: string;
}

const SendForm = ({ eventId }: SendFormProps) => {
  const { toast } = useToast();
  const { mutateAsync } = useSendForm();

  const handleSendForm = async (eventId: string) => {
    try {
      await mutateAsync(eventId);

      toast({
        title: "Forms Sent Successfully",
        description: "All Forms have been sent to the invitees who checked in!",
      });
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
        title="Send Evaluation Form Confirmation"
        description="Please confirm your action to send the evaluation form to event attendees. Once sent, attendees will receive the form to provide their feedback. Please note that once an attendee responds to the evaluation form, they will no longer be able to edit their responses. By confirming, you agree to proceed with sending the evaluation form and understand the implications regarding editing responses."
        className="mt-5 border-2 border-black bg-white text-black hover:text-white"
        name="Send Form"
        cta={() => handleSendForm(eventId)}
      />
    </>
  );
};

export default SendForm;
