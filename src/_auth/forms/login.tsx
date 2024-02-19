import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col gap-5">
          <img src="/logo.svg" alt="logo" className="w-24" />
          <div>
            <h1 className="font-extrabold text-5xl tracking-tighter">Login to Your Account</h1>
            <p className="mt-2 font-normal tracking-tight text-base">Welcome Back !</p>
          </div>
          <div className="h-0.5 w-full bg-slate-100"></div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <p className="text-xs text-slate-400 mt-1 ml-6">You agree to our Terms of Service and Privacy Policy.</p>
          </div>
          <Button className="mt-5">Log In</Button>
        </div>
      </div>
    </>
  );
};

export default Login;
