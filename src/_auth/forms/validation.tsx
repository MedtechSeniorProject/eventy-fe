import Timer from "@/components/Timer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CodeSchema, codeSchema } from "@/lib/validations/code";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useResendCode, useValidateAccount } from "@/lib/queries/queries";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import useAuth from "../hook/useAuth";
import { ValidateUser } from "@/types/types";

const Validation: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setIsAuthenticated } = useAuth();

  //Queries
  const { mutateAsync: validateAccount } = useValidateAccount();
  const { mutateAsync: resendCode } = useResendCode();

  // Form Submission
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CodeSchema>({
    resolver: zodResolver(codeSchema),
  });

  const handleResendCode = async(email: ValidateUser) => {
    const response = await resendCode(email);
    const data = await response.json()

    if(!response.ok){
      toast({title:"An error has occured"})
      return;
    }
    if(data?.message){
      toast({title:"Resended Email Successfuly", description: data?.message})
      return;
    }

  }

  const onSubmit = async (data: CodeSchema) => {
    const reqObj = {
      email: location.state.email,
      validationCode: data.code,
    };

    const response = await validateAccount(reqObj);
    if (!response.ok) {
      toast({ variant: "destructive", title: response.statusText, description: "Invalid Code" });
      return;
    }

    const resData = await response.json();
    setUser({
      accessToken: resData.accessToken,
      email: resData?.eventManager.email,
      id: resData?.eventManager.id,
      name: resData?.eventManager.name,
      isSuperAdmin: false,
    });
    setIsAuthenticated(true);
    navigate("/events");
    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit) } className="py-14 px-6 xs:px-12 lg:px-20 mx-auto ">
        <div className="flex flex-col gap-20">

          {/* //logo */}
          <div className="flex items-center justify-center">
          <img src="/assets/eventy.png" alt="logo" className="w-20 md:w-20 lg:w-24" />
          </div>

          {/* //welcome */}
          <div>
            <h1 className="font-extrabold text-5xl tracking-tighter">
              Login to Your Account
            </h1>
            <p className="mt-2 font-normal tracking-tight text-base">
              Welcome Back !
            </p>
            <div className="h-0.5 w-full bg-slate-100"></div>
          </div>

       {/* //form fields & accept */}
        <div className="flex flex-col gap-5 mt-5">
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
              {...register("code", {required: true})}
              type="text"
              pattern="[0-9]*"
              id="code"
              inputMode="numeric"
              placeholder="Verification Code"
            />
          </div>
          </div>

          {/* buttons */}
          <div className="flex justify-between">
            <Button   
              type="button"
              variant={"secondary"}
              onClick={async () => {handleResendCode(location.state)}}
              className=" h-10 w-24 md:w-36 lg:w-40 bg-black p-0">
             <span className="h-10 w-24 md:w-36 lg:w-40 block translate-x-2 -translate-y-2 border-2 border-black bg-white p-2 text-black transition-all hover:-translate-y-3 active:translate-x-0 active:translate-y-0 text-center">
              Resend Code
             </span>
            </Button>

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className=" h-10 w-24 md:w-36 lg:w-40 bg-black p-0">
            <span className="h-10 w-24 md:w-36 lg:w-40 block translate-x-2 -translate-y-2 border-2 border-black bg-primary p-2 transition-all hover:-translate-y-3 active:translate-x-0 active:translate-y-0 text-center">
            {isSubmitting && <div className="mr -5">Loading...</div>}
              {!isSubmitting && "Verify"}{" "}
              </span>
            </Button>
          </div>

        </div>
      </form>
    </>
  );
};

export default Validation;
