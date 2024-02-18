import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <img src="/logo.svg" alt="logo" className="w-24" />
        <div>
          <h1 className="font-extrabold text-5xl">Login to Your Account</h1>
          <p className="mt-2">Welcome Back !</p>
        </div>
        <div className="h-0.5 w-full bg-slate-100"></div>
      </div>
      <div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Password" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <Button>Log In</Button>
      </div>
    </>
  );
};

export default Login;
