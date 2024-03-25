import { useUpdateEvent } from "@/lib/queries/queries";
import { Button } from "../ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "../ui/use-toast";
import { useRef } from "react";
import { DropdownMenuSeparator, DropdownMenuLabel, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";
import { Event } from "@/types/types";

interface EditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  eventId: string;
  event: Event
}

export default function Editor({ value, setValue, eventId, event }: EditorProps) {
  const { toast } = useToast();
  const { mutateAsync: updateEvent, isLoading } = useUpdateEvent();
  const quillRef = useRef(false);

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

  async function handleSubmit() {
    const event = {
      id: eventId,
      emailTemplate: value,
    };
    try {
      await updateEvent(event);
      toast({ title: "Email Template Saved Successfully" });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error has occured while updating the email template!",
      });
    }
  }

  async function handleAppendTitle(eventProperty: string) {
    // Focus the editor before appending
    quillRef.current?.focus();

    const currentSelection = quillRef.current.getEditor().getSelection()
    console.log(currentSelection)
    
    if (currentSelection) {
      quillRef.current?.getEditor()?.insertText(currentSelection.index, `${eventProperty}\n`, 'user'); // Insert with authorship attribution
    } else {
      const currentValue = quillRef.current?.getEditor()?.getContents(); // Get current content
      const updatedContent = currentValue ? `${eventProperty}\n\n${currentValue}` : eventProperty; // Prepend based on existing content
      setValue(updatedContent);
    }
  }

  return (
    <div className="mt-10">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mb-5">Add Event Properties</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel>
              Properties
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => {handleAppendTitle(event.name)}}>Title</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {handleAppendTitle(event.startTime)}}>Event Start</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {handleAppendTitle(event.endTime)}}>Event End</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {handleAppendTitle(event.address)}}>Address</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {handleAppendTitle(event.description)}}>Description</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        ref={quillRef}
      />
      <div className="flex justify-end">
        <Button
          disabled={isLoading}
          variant={"inverse"}
          size={"lg"}
          className="mt-5"
          onClick={() => handleSubmit()}
        >
          {isLoading ? "Loading..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
