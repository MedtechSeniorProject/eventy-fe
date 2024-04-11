import { useState } from "react";
import AddQuestion from "./AddQuestion";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Question } from "@/types/types";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useAddEvaluationForm } from "@/lib/queries/queries";
import { useToast } from "./ui/use-toast";
import { areArraysEqual } from "@/lib/utils";
import EditQuestion from "./EditQuestion";

const EvaluationForm = ({ ...props }) => {
  const [questions, setQuestions] = useState<Question[]>(props.questions);
  const { mutateAsync: addEvaluationFormQuestions, isLoading } = useAddEvaluationForm();
  const { toast } = useToast();

  async function handleSaveForm() {
    const form = {
      eventId: props.eventId,
      questions: questions,
    };
    if(areArraysEqual(props.questions, questions)){
      toast({title:"No changes", description:"No changes made to form"})
      return;
    }
    try {
      await addEvaluationFormQuestions(form);
      toast({title:"Form saved", description:"Evaluation form saved successfully"})
    } catch (error) {
      toast({title:"Error", description: "Failed to save form"})
    }
  }

  return (
    <>
      <AddQuestion setQuestions={setQuestions} />
      {!areArraysEqual(props.questions, questions) && (
        <div className="text-sm text-gray-500">You made changes. Do not forget to save.</div>
      )}
      <div className="my-5 border-2 border-black p-5 w-10/12">
        <div className="text-black text-xl font-bold underline">Preview</div>
        {questions.length === 0 ? (
          <div className=" text-gray-400">No questions added</div>
        ) : (
          <>
            <div className="flex flex-col gap-5 mt-3">
              {questions.map((question, index) => {
                return (
                  <div key={index}>
                    <div className="flex justify-between">
                      <h3 className="font-medium mb-2">
                        Question {index + 1}: {question.question} <span className="text-red-500 font-semibold">{question.isRequired && "**"}</span>
                      </h3>
                      <div className="flex gap-3">
                        <EditQuestion question={question} setQuestions={setQuestions} />
                        <Trash
                          strokeWidth={2}
                          size={20}
                          onClick={() => {
                            const updatedQuestions = [...questions];
                            updatedQuestions.splice(index, 1);
                            setQuestions(updatedQuestions);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />
                      </div>
                    </div>
                    {question.type === "Checkbox" && (
                      <>
                        {Array.isArray(question.options) &&
                          question.options.map((option, index) => {
                            return (
                              <div key={index}>
                                <Checkbox disabled />
                                <Label className="ml-2">{option}</Label>
                              </div>
                            );
                          })}
                      </>
                    )}
                    {question.type === "Input" && (
                      <Input disabled className="w-[400px]" type="text" />
                    )}
                    {question.type === "Radio" && (
                      <>
                        <RadioGroup>
                          {Array.isArray(question.options) &&
                            question.options.map((option, index) => {
                              return (
                                <div key={index}>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value={option}
                                      id={option}
                                      disabled
                                    />
                                    <Label htmlFor={option}>{option}</Label>
                                  </div>
                                </div>
                              );
                            })}
                        </RadioGroup>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div className="flex justify-end">
          <Button variant="inverse" onClick={handleSaveForm} disabled={isLoading}>
            {isLoading ? "Loading..." : "Save Form"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EvaluationForm;