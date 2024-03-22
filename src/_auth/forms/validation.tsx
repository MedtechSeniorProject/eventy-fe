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
import { useTimer } from 'react-timer-hook';
import { ToastAction } from "@/components/ui/toast";
import { AxiosError } from "axios";

const Validation: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setIsAuthenticated } = useAuth();

  //Queries
  const { mutateAsync: validateAccount } = useValidateAccount();
  const { mutateAsync: resendCode, isLoading } = useResendCode();

  // Form Submission
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CodeSchema>({
    resolver: zodResolver(codeSchema),
  });

  // Timer
  const time= new Date();
  time.setSeconds(time.getSeconds() + 120);
  const {
    seconds,
    minutes,
    restart
  } = useTimer({ expiryTimestamp: time, onExpire: () => {
    toast({
      title: "Uh oh! The timer has expired.",
      description: "Click to request a new code.",
      action: <ToastAction altText="Try again" onClick={() => handleResendCode(location.state)}>Resend Code</ToastAction>,
      duration: 20000
    })
  } });
  
  // Handle Resend Code Function
  const handleResendCode = async(email: ValidateUser) => {
    try{
      const response = await resendCode(email);
      const data = await response.data
      if (data?.message) {
        toast({title:"Resended Email Successfuly", description: data?.message})
        restart(time)
        reset()
      }
    }catch(error){
      console.error('Error:', error)
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        toast({ variant:"destructive", title: 'Error', description: 'An error occurred while fetching data!' });
      } else if (axiosError.request) {
        console.error('No response received:', axiosError.request);
        toast({ variant:"destructive", title: 'Network Error', description: 'Failed to fetch data due to network issue!' });
      } else {
        console.error('Request setup error:', axiosError.message);
        toast({ variant:"destructive", title: 'Request Error', description: 'Failed to setup request!' });
      }
    }
  }

  const onSubmit = async (data: CodeSchema) => {
    const reqObj = {
      email: location.state.email,
      validationCode: data.code,
    };

    try{
      const response = await validateAccount(reqObj);
      const resData = await response.data;
      //superadmin
      if (resData.superadmin) {
        setUser({
          accessToken: resData.accessToken,
          email: resData?.superadmin.email,
          id: resData?.superadmin.id,
          name: resData?.superadmin.name,
          isSuperAdmin: true,
        });
        setIsAuthenticated(true);
        navigate("/eventmanagers");
        return;
      }
      //eventmanager
      else{ 
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
    }
    }catch(error){
      console.error('Error:', error)
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        toast({ variant:"destructive", title: 'Error', description: 'Invalid Code!' });
      } else if (axiosError.request) {
        console.error('No response received:', axiosError.request);
        toast({ variant:"destructive", title: 'Network Error', description: 'Failed to fetch data due to network issue!' });
      } else {
        console.error('Request setup error:', axiosError.message);
        toast({ variant:"destructive", title: 'Request Error', description: 'Failed to setup request!' });
      }
    }
   
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit) } className="py-14 px-6 xs:px-12 lg:px-20 mx-auto ">
        <div className="flex flex-col gap-10">

          {/* //logo */}
          <div className="flex items-center justify-center">
          <img src="/assets/eventy.png" alt="logo" className="w-20 md:w-20 lg:w-24" />
          </div>

          {/* //welcome */}
          <div>
            <h1 className="font-bold text-5xl tracking-tighter">
              Login to Your Account
            </h1>
            <p className="my-2 font-normal tracking-tight text-base">
              Welcome Back !
            </p>
            <div className="h-0.5 w-full bg-slate-900"></div>
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
            <div>
              <div className='font-medium text-lg'>
                <span>{minutes}</span>:<span>{seconds}</span>
              </div>
            </div>
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
              disabled={isLoading}
              className=" h-10 w-24 md:w-36 lg:w-40 bg-black p-0">
             <span className="h-10 w-24 md:w-36 lg:w-40 block translate-x-2 -translate-y-2 border-2 border-black bg-white p-2 text-black transition-all hover:-translate-y-3 active:translate-x-0 active:translate-y-0 text-center">
              {isLoading ? "Loading" : "Resend Code"}
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
