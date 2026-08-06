import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  Bookmark,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";

const Post = () => {

    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const changeEventHandler = (e) => {
        e.preventDefault();
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        }
        else {
            setText("");
        }
    }
  return (
    <div className="mx-auto my-8 w-full max-w-md">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between py-2">

        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarImage
              src=""
              alt="profile"
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-2">
            <h1 className="cursor-pointer text-sm font-semibold">
              userName
            </h1>

            <span className="text-sm text-gray-400">• 2h</span>
          </div>
        </div>

        {/* More Options */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="rounded-full p-2 transition hover:bg-gray-100"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-sm p-0">
            <div className="flex flex-col text-center">

              <Button
                variant="ghost"
                className="h-12 rounded-none border-b font-semibold text-[#ED4956]"
              >
                Unfollow
              </Button>

              <Button
                variant="ghost"
                className="h-12 rounded-none border-b"
              >
                Add to Favourite
              </Button>

              <Button
                variant="ghost"
                className="h-12 rounded-none"
              >
                Cancel
              </Button>

            </div>
          </DialogContent>
        </Dialog>

      </div>


      {/* ================= POST IMAGE ================= */}

      <div className="overflow-hidden rounded-md border border-gray-200">
        <img
          src="https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?cs=srgb&dl=cascade-clouds-cool-wallpaper-210186.jpg&fm=jpg"
          alt="post"
          className="aspect-square w-full object-cover"
        />
      </div>


      {/* ================= ACTIONS ================= */}

      <div className="mt-3 flex items-center justify-between">

        {/* Left Actions */}
        <div className="flex items-center gap-4">

          <FaRegHeart
            size={24}
            className="cursor-pointer transition hover:text-gray-500"
          />

          <MessageCircle
                      size={24}
                      onClick={()=>setOpen(true)}
            className="cursor-pointer transition hover:text-gray-500"
          />

          <Send
            size={24}
            className="cursor-pointer transition hover:text-gray-500"
          />

        </div>

        {/* Bookmark */}
        <Bookmark
          size={24}
          className="cursor-pointer transition hover:text-gray-500"
        />

      </div>


      {/* ================= LIKES ================= */}

      <p className="mt-3 text-sm font-semibold">
        1,240 likes
      </p>


      {/* ================= CAPTION ================= */}

      <div className="mt-1 text-sm">
        <span className="mr-2 font-semibold">
          userName
        </span>

        <span>
          Beautiful view from today's adventure 🌄
        </span>
      </div>


      {/* ================= COMMENTS ================= */}

      <button
              type="button"
              className="mt-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setOpen(true)}
      >
        View all 24 comments
          </button>
          <CommentDialog open={open} setOpen = {setOpen} />
          <div className="flex items-center justify-between">
              <input
              type='text'
              placeholder="Add a comment....."
              value={text}
              onChange={changeEventHandler}

              className="outline-none text-sm w-full "
          
          />
           {text && <span className="text-[#3BADF8]" >Post</span>}
          </div>


      {/* ================= TIME ================= */}

      <p className="mt-1 text-xs text-gray-400">
        2 hours ago
      </p>

    </div>
  );
};

export default Post;