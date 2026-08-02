import React,{useState} from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signuHandler = (e) => {
        e.preventDefault();
            console.log(input);
        try {
            const res = await 
        } catch (error) {
            
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
            htmlFor="username"
            className="text-sm font-semibold text-zinc-800"
          >
            Username
          </Label>

          <Input
            id="username"
            name="username"
                      type="text"
                      value={input.username}
                      onChange={changeEventHandler}
            placeholder="Enter username"
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