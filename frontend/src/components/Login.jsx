import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

        if (res.data.success) {
          
            navigate('/');
        toast.success(res.data.message);
          console.log(res.data);

        setInput({
          email: "",
          password: "",
        });
      }

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">

      <form
        onSubmit={loginHandler}
        className="flex w-full max-w-md flex-col gap-5 rounded-xl border bg-white p-8 shadow-lg"
      >

        <div className="mb-2 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Logo</h1>

          <p className="max-w-xs text-center text-sm text-zinc-500">
            Log in to see photos and videos from your friends and family.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            name="email"
            type="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Enter email"
            className="h-11 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password
          </Label>

          <Input
            id="password"
            name="password"
            type="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Enter password"
            className="h-11 rounded-lg"
          />
        </div>

              {loading ? 
                  (
                      <Button>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                  </Button>
                  )
                  : (
                      <Button type="submit" className="mt-2 h-11 w-full">
                                Login
                              </Button>
                      )
            }

        <p className="text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link className="text-blue-600" to='/signup'>Signup</Link>
        </p>

      </form>
    </div>
  );
};

export default Login;