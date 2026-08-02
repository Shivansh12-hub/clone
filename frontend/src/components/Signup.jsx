import React,{useState} from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import axios from "axios"
import { toast } from "sonner"

const Signup = () => {
    const [input, setInput] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signuHandler = async (e) => {
        e.preventDefault();
        // console.log(input);
        
        try {
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
                headers: {
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">

      <form onSubmit={signuHandler} className="flex w-full max-w-md flex-col gap-5 rounded-xl border bg-white p-8 shadow-lg">

        {/* Header */}
        <div className="mb-2 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">
            Logo
          </h1>

          <p className="max-w-xs text-center text-sm text-zinc-500">
            Sign up to see photos and videos from your friends and family.
          </p>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label
            htmlFor="userName"
            className="text-sm font-semibold text-zinc-800"
          >
            UserName
          </Label>

          <Input
            id="userName"
            name="userName"
                      type="text"
                      value={input.userName}
                      onChange={changeEventHandler}
            placeholder="Enter userName"
            className="h-11 rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-semibold text-zinc-800"
          >
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

        {/* Password */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-zinc-800"
          >
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

        {/* Submit */}
        <Button
          type="submit"
          className="mt-2 h-11 w-full"
        >
          Sign Up
        </Button>

        {/* Login */}
        <p className="text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <button
            type="button"
            className="font-semibold text-zinc-900 hover:underline"
          >
            Log in
          </button>
        </p>

      </form>
    </div>
  )
}

export default Signup