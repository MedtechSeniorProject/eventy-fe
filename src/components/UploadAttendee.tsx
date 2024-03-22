import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { useAddAttendees } from "@/lib/queries/queries";
import * as XLSX from 'xlsx';
import { AddAttendees, AttendeeForm } from "@/types/types";
import { AxiosError } from "axios";

const UploadAttendee = ({...props}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {mutateAsync: addAttendees } = useAddAttendees()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async(e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as Array<Array<string>>;

      const headers = jsonData[0].map((header: string) => header.toLowerCase());
      const parsedData = jsonData.slice(1).map((row) => {
        const obj: AttendeeForm = { name: "", email: "" };
        headers.forEach((header, index) => {
          obj[header as keyof AttendeeForm] = row[index];
        });
        return obj;
      });
      const params: AddAttendees = {
        eventId: props.eventId,
        attendees: parsedData
      }

      try{
        const response = await addAttendees(params)
        toast({title:"Attendees Added Successfully", description:`${params.attendees.length} Attendees are added to the list`})
      }catch(error){
        console.error('Error:', error)
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          toast({variant:"destructive",title:"Error", description:"Error while uploading attendees to this event!"})
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          setIsLoading(false);
        } else if (axiosError.request) {
          console.error('No response received:', axiosError.request);
          toast({ variant:"destructive", title: 'Network Error', description: 'Failed to fetch data due to network issue!' });
        } else {
          console.error('Request setup error:', axiosError.message);
          toast({ variant:"destructive", title: 'Request Error', description: 'Failed to setup request!' });
        }
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setIsLoading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          ref={fileInputRef}
          accept=".xlsx"
          id="attendees"
          type="file"
          onChange={handleFileUpload}
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default UploadAttendee;
