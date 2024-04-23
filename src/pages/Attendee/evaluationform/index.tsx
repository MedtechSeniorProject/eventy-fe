import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  useGetEvaluationFormQuestions,
  useGetEvaluationFormResponses,
} from "@/lib/queries/queries";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { responseForm } from "@/types/types";
import SEO from "@/components/SEO";

const AttendeeEvaluationForm = () => {
  const { eventId, inviteeId } = useParams() as {
    eventId: string;
    inviteeId: string;
  };
  const { toast } = useToast();
  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useGetEvaluationFormQuestions(eventId, inviteeId);

  const { mutateAsync: updateResponses } = useGetEvaluationFormResponses();

  const [formData, setFormData] = useState<
    { id: string; responses: string[] }[]
  >([]);
  const [loading, setLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center font-semibold">
        Loading...
      </div>
    );
  }

  if (isError || event?.length === 0) {
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center font-semibold">
        <div className="mb-3 text-2xl underline text-red-500">
          {(error?.response?.data as any)?.name ||
            "Error"}
        </div>
        <div>{(error?.response?.data as any)?.message || "Failed to load event"}</div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const requiredCheckboxQuestions = (event ?? []).filter(
      (q) => q.type === "Checkbox" && q.isRequired
    );
    const hasMissingCheckbox = requiredCheckboxQuestions.some(
      (q) =>
        !formData.some((data) => data.id === q.id && data.responses.length > 0)
    );

    if (hasMissingCheckbox) {
      toast({
        title: "Form Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const form: responseForm = {
      eventId: eventId,
      attendeeId: inviteeId,
      responses: formData,
    };

    try {
      await updateResponses(form);
      toast({
        title: "Success",
        description: "Form submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Form Error",
        description: "Failed to submit form",
        variant: "destructive",
      });
    }
    setLoading(false);
    return;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    questionId: string,
    questionType: string
  ) => {
    const updatedFormData = [...formData];
    const questionIndex = updatedFormData.findIndex(
      (item) => item.id === questionId
    );

    if (questionType === "Checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      const response = e.target.value;

      if (isChecked) {
        if (questionIndex === -1) {
          updatedFormData.push({ id: questionId, responses: [response] });
        } else {
          updatedFormData[questionIndex].responses.push(response);
        }
      } else {
        if (questionIndex !== -1) {
          updatedFormData[questionIndex].responses = updatedFormData[
            questionIndex
          ].responses.filter((r) => r !== response);
        }
      }
    } else if (questionType === "Input" || questionType === "Radio") {
      const response = e.target.value;
      if (questionIndex !== -1) {
        updatedFormData[questionIndex].responses = [response];
      } else {
        updatedFormData.push({ id: questionId, responses: [response] });
      }
    }
    setFormData(updatedFormData);
  };

  return (
    <>
      <SEO
        title="Eventy - Evaluation Form"
        description="Event Management System Evaluation Form Page"
        name="Eventy"
        type="evaluation form" />
    
    <div className="w-full h-full">
    <div className="flex flex-col items-center py-10">
      <img src="/assets/eventy.png" width={50} />
      <h1 className="mt-5 font-bold text-3xl underline">Evaluation Form</h1>
      <div className="my-5 border-2 border-black p-5 w-11/12 md:w-6/12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-3">
          {event?.map((question, index) => {
            return (
              <div key={index}>
                <div className="flex justify-between">
                  <h3 className="font-medium mb-2">
                    Question {index + 1}: {question.question}{" "}
                    <span className="text-red-500 font-semibold">
                      {question.isRequired && "**"}
                    </span>
                  </h3>
                </div>
                {question.type === "Checkbox" && (
                  <>
                    {Array.isArray(question.options) &&
                      question.options.map((option, idx) => {
                        return (
                          <div key={idx}>
                            <input
                              type="checkbox"
                              className="regular-checkbox"
                              value={option}
                              name={question.id}
                              onChange={(e: any) =>
                                handleInputChange(e, question.id, question.type)
                              }
                            />
                            <Label className="ml-2">{option}</Label>
                          </div>
                        );
                      })}
                  </>
                )}
                {question.type === "Input" && (
                  <Input
                    required={question.isRequired}
                    className="w-full xl:w-1/2"
                    type="text"
                    onChange={(e: any) =>
                      handleInputChange(e, question.id, question.type)
                    }
                    name={question.question}
                  />
                )}
                {question.type === "Radio" && (
                  <>
                    <RadioGroup>
                      {Array.isArray(question.options) &&
                        question.options.map((option, idx) => {
                          return (
                            <div key={idx}>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  required={question.isRequired}
                                  value={option}
                                  className="regular-radio"
                                  name={question.id}
                                  id={option}
                                  onChange={(e: any) =>
                                    handleInputChange(
                                      e,
                                      question.id,
                                      question.type
                                    )
                                  }
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
          <div className="flex justify-center">
            <Button variant="inverse" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Submit Form"}
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default AttendeeEvaluationForm;
