"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import myAxios from "@/lib/axios.config";
import { REGISTER_URL } from "@/lib/apiEndPoints";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function Register() {
  const [authState, setAuthState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: [],
    username: [],
    email: [],
    password: [],
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    myAxios
      .post(REGISTER_URL, authState)
      .then((res) => {
        setLoading(false);
        toast.success("Account created successfully! we are logging you");
        signIn("credentials", {
          email: authState.email,
          password: authState.password,
          redirect: true,
          callbackUrl: "/",
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response?.data.errors);
        } else {
          toast.error("Something went wrong, please try again!");
        }
      });
  };

  return (
    <div>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Welcome to Blogeq.dev</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Mr. Foobar"
                  value={authState.name}
                  onChange={(e) =>
                    setAuthState({ ...authState, name: e.target.value })
                  }
                />
                <span className="text-red-400 text-xs">{errors.name?.[0]}</span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="foobar"
                  value={authState.username}
                  onChange={(e) =>
                    setAuthState({ ...authState, username: e.target.value })
                  }
                />
                <span className="text-red-400 text-xs">
                  {errors.username?.[0]}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={authState.email}
                  onChange={(e) =>
                    setAuthState({ ...authState, email: e.target.value })
                  }
                />
                <span className="text-red-400 text-xs">
                  {errors.email?.[0]}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="*****"
                  value={authState.password}
                  onChange={(e) =>
                    setAuthState({ ...authState, password: e.target.value })
                  }
                />
                <span className="text-red-400 text-xs">
                  {errors.password?.[0]}
                </span>
              </div>
              <div className="space-y-1">
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input
                  id="cpassword"
                  type="password"
                  placeholder="*****"
                  value={authState.password_confirmation}
                  onChange={(e) =>
                    setAuthState({
                      ...authState,
                      password_confirmation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-2">
                <Button className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Register"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}
