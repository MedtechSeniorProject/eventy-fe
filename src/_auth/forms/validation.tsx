import Timer from "@/components/Timer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CodeSchema, codeSchema } from "@/lib/validations/code";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";

const Validation = () => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CodeSchema>({
    resolver: zodResolver(codeSchema),
  });

  const onSubmit = async (data: CodeSchema) => {
    await sleep(2000);
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <img src="/logo.svg" alt="logo" className="w-24" />
          <div>
            <h1 className="font-extrabold text-5xl tracking-tighter">
              Login to Your Account
            </h1>
            <p className="mt-2 font-normal tracking-tight text-base">
              Welcome Back !
            </p>
          </div>
          <div className="h-0.5 w-full bg-slate-100"></div>
        </div>

        <div className="flex flex-col gap-10 mt-5">
          {errors.code && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{`${errors.code.message}`}</AlertDescription>
            </Alert>
          )}
          <div>
            <h3 className="text-2xl font-semibold tracking-tighter primary">
              One more step to go !
            </h3>
            <p>
              Please enter the 6-digit verification code we just sent you by
              email:{" "}
            </p>
            <Timer />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Verification Code</Label>
            <Input
              {...register("code")}
              type="number"
              id="code"
              placeholder="Verification Code"
            />
          </div>
          <div className="flex justify-between">
            <Button type="button" variant={"secondary"}>
              Resend Code
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-32">
              {isSubmitting && <div className="mr -5">Loading...</div>}
              {!isSubmitting && "Verify"}{" "}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Validation;
