import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { loginSchema, LoginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { FunctionComponent } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLoginAccount } from "@/lib/queries/queries";
import useAuth from "../hook/useAuth";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();
  const { mutateAsync: loginAccount } = useLoginAccount();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email:"",
      password:"",
      terms: false,
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    
    const response = await loginAccount(user);
    const resData = await response.json();
    // Invalid Credentials
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: resData?.name,
        description: resData?.message,
      });
      return;
    } else {
      // SuperAdmin
      if (resData?.accessToken) {
        toast({ variant: "default", description: "Successfully Logged In" });
        setUser({
          accessToken: resData.accessToken,
          email: resData?.superadmin?.email,
          id: resData?.superadmin?.id,
          name: resData?.superadmin?.name,
          isSuperAdmin: true,
        });
        setIsAuthenticated(true);
        navigate("/eventmanagers");
        reset();
        return;
      }
      // Event Manager
      if (resData?.message) {
        toast({ variant: "default", description: resData.message });
        navigate("/validate", {
          state: { email: user.email },
        });
        reset();
        return;
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-5">
          <img src="/assets/eventy.png" alt="logo" className="w-24" />
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
        <div className="flex flex-col gap-5 mt-5">
          {(errors.email || errors.password) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              {errors.email && (
                <AlertDescription>{`${errors.email?.message}`}</AlertDescription>
              )}
              {errors.password && (
                <AlertDescription>{`${errors.password?.message}`}</AlertDescription>
              )}
            </Alert>
          )}
          {errors.terms && <span>This field is required</span>}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <Controller
                name="terms"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Checkbox checked={field.value}
                  onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <p className="text-xs text-slate-400 mt-1 ml-6">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-5">
            {isSubmitting && <div className="mr -5">Loading...</div>}
            {!isSubmitting && "Log In"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
