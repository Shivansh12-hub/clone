import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const sideBarItems = [
  { icon: <Home />, text: "Home" },
  { icon: <Search />, text: "Search" },
  { icon: <TrendingUp />, text: "Explore" },
  { icon: <MessageCircle />, text: "Messages" },
  { icon: <Heart />, text: "Notification" },
  { icon: <PlusSquare />, text: "Create" },
  {
    icon: (
      <Avatar className="h-7 w-7">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icon: <LogOut />, text: "Logout" },
];

const LeftSideBar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {}, // request body
        {
          withCredentials: true, // config
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const sideBarHandler = (action) => {
    if (action === "Logout") {
      logoutHandler();
    }
  };

  return (
    <div
      className="
        fixed left-0 top-0 z-10
        h-screen w-[16%]
        border-r border-gray-200
        bg-white
        px-4 py-8
      "
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <h1 className="mb-10 px-3 text-2xl font-bold tracking-tight">Logo</h1>

        {/* Menu */}
        <div className="flex flex-col gap-2">
          {sideBarItems.map((item, index) => (
            <div
              onClick={() => sideBarHandler(item.text)}
              key={index}
              className="
                flex cursor-pointer
                items-center gap-4
                rounded-lg
                px-3 py-3
                transition-all duration-200
                hover:bg-gray-100
                active:scale-[0.98]
              "
            >
              <div className="flex h-7 w-7 items-center justify-center">
                {item.icon}
              </div>

              <span className="text-[15px] font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
