import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { Button } from "./ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Pen } from "lucide-react";
import { Question } from "@/types/types";

const FormSchema = z.object({
  options: z.preprocess((foo) => {
    if (!foo || typeof foo !== "string") return null;
    return foo === "" ? null : foo;
  }, z.string().optional().nullable()),
  type: z.enum(["Checkbox", "Input", "Radio"]),
  question: z.string().min(1),
  isRequired: z.preprocess((foo) => {
    if (!foo || typeof foo !== "boolean") return false;
    return foo === false ? false : foo;
  }, z.boolean()),
});

const EditQuestion = ({ ...props }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: props.question.type,
      question: props.question.question,
      options: props.question?.options?.map((option: string) => option).join(", "),
      isRequired: props.question.isRequired,
    },
  });
  const [open, setOpen] = useState<boolean>(false);

async function onSubmit(data: z.infer<typeof FormSchema>) {
  const newData = {
    ...data,
    options: data.type === "Input" ? null : data.options?.split(",").map((option) => option.trim()),
  };
  
  props.setQuestions((prev: any) => {
    return prev.map((question: Question, index: number) => {
      if (index === props.index) {
        return {
          ...question,
          ...newData,
        };
      }
      return question;
    });
  });
  
  setOpen(false);
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pen size={20} className="cursor-pointer hover:text-gray-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Question Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Checkbox">Checkbox</SelectItem>
                      <SelectItem value="Input">Input</SelectItem>
                      <SelectItem value="Radio">Radio</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {(form.watch("type") === "Checkbox" ||
              form.watch("type") === "Radio") && (
              <FormField
                control={form.control}
                name="options"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Options</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormDescription>
                      Write the options separated by commas{" "}
                      <span className="underline font-medium">ex:</span> Option
                      1, Option2
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="isRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Required</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button variant={"secondary"} className="w-20" type="submit">
              {form.formState.isSubmitting ? "Loading..." : "Edit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestion;
