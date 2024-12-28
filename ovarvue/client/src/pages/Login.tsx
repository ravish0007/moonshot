import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import API from "@/api";
import React, { useState } from "react";
import useUserStore from "@/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setLoading(true);

    const errorMessages = [];
    if (!email) {
      errorMessages.push("Email cannot be empty");
    }

    if (!password) {
      errorMessages.push("Password cannot be empty");
    }

    setErrors(errorMessages);

    if (errorMessages.length > 0) {
      return;
    }

    const { error, data } = await API.login(email, password);

    console.log(data);

    if (error) {
      setErrors([
        error == 401
          ? "Email or password is incorrect"
          : "Something went wrong, please try after some time.",
      ]);
    }

    if (data) {
      API.setAccessToken(data.token);
      sessionStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (errors.length > 0) {
      setErrors([]);
    }
  }, [email, password]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account{" "}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSumbit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      type="password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {loading ? <Loader /> : "Login"}
                  </Button>
                </div>
                <div className="text-sm text-red-500 mt-2">
                  {errors.map((error) => (
                    <p className="text-center" key={error}>
                      {error}
                    </p>
                  ))}
                </div>

                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={() => navigate("/signup")}
                    className="underline underline-offset-4 cursor-pointer select-none"
                  >
                    Sign up
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
