import { useUpdateEvent } from "@/lib/queries/queries";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "../ui/use-toast";

interface EditorProps {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
  eventId: string
}

export default function Editor({value, setValue, eventId} : EditorProps) {

  const { toast } = useToast()
  const {mutateAsync: updateEvent, isLoading} = useUpdateEvent()
  
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
  ];

  async function handleSubmit(){
    const event = {
      id: eventId,
      emailTemplate: value
    }
    try{
      await updateEvent(event)
      toast({title: "Email Template Saved Successfully"})
    }catch(error){
      console.log(error)
      toast({variant:"destructive", title:"Error", description:"Error has occured while updating the email template!"})
    }
  }

  return (
    <>
      <ReactQuill
        className="mt-10"
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
      <div className="flex justify-end">
      <Button disabled={isLoading} variant={"inverse"} size={"lg"} className="mt-5" onClick={() => handleSubmit()}>{isLoading ? "Loading..." : "Save"}</Button>
      </div>
    </>
  );
}
