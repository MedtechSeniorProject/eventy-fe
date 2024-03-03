import { useRef } from "react";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const UploadAttendee = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension !== "csv") {
        toast({
          variant: "destructive",
          title: "File Format Error",
          description: "Please select a CSV file",
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;

        const rows = text.split("\n");
        const headers = rows[0].split(",").map((header) => header.trim());
        const data: any[] = [];
        for (let i = 1; i < rows.length; i++) {
          if (rows[i].trim() === "") continue;
          const values = rows[i].split(",");
          const rowData: Record<string, string> = {};
          for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = values[j]?.trim() ?? "";
          }
          data.push(rowData);
        }
        toast({
          variant: "default",
          title: "File Uploaded Successfully",
          description: `Added ${data.length} Attendees to this event !`,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          ref={fileInputRef}
          accept=".csv"
          id="attendees"
          type="file"
          onChange={handleFileUpload}
        />
      </div>
    </>
  );
};

export default UploadAttendee;
