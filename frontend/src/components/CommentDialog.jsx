import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

const CommentDialog = ({ open, setOpen }) => {
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [text, setText] = useState("");



    const sendMessageHandler = async () => {
        alert(text);
    }


    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        }
        else {
            setText("");
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 
        Key Fix: Added sm:max-w-[80vw] & lg:max-w-[70vw] to forcefully 
        override shadcn's default sm:max-w-lg setting!
      */}
      <DialogContent className="p-0 sm:max-w-[85vw] lg:max-w-[75vw] xl:max-w-[65vw] w-full h-[85vh] max-h-[850px] overflow-hidden flex flex-col md:flex-row gap-0 border-none">
        
        {/* Left Side: Post Image Container (65% Width) */}
        <div className="w-full md:w-[65%] h-1/2 md:h-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src="https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?cs=srgb&dl=cascade-clouds-cool-wallpaper-210186.jpg&fm=jpg"
            alt="Modal banner"
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* Right Side: Header, Comments, & Input (35% Width) */}
        <div className="w-full md:w-[35%] h-1/2 md:h-full flex flex-col justify-between p-4 bg-background border-l border-border">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-none">
                  username
                </span>
                <span className="text-xs text-muted-foreground">
                  Location or Bio
                </span>
              </div>
            </div>

            {/* Options Dialog Trigger */}
            <Dialog open={optionsOpen} onOpenChange={setOptionsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xs p-0 overflow-hidden text-center rounded-xl">
                <div className="flex flex-col text-sm">
                  <button className="py-3 font-bold text-destructive hover:bg-accent border-b border-border">
                    Unfollow
                  </button>
                  <button className="py-3 hover:bg-accent border-b border-border">
                    Add to favorites
                  </button>
                  <button className="py-3 hover:bg-accent border-b border-border">
                    About this account
                  </button>
                  <button
                    onClick={() => setOptionsOpen(false)}
                    className="py-3 hover:bg-accent font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Comments Scroll Area */}
          <div className="flex-1 overflow-y-auto py-3">
            <p className="text-xs text-muted-foreground">No comments yet.</p>
          </div>

          {/* Footer / Comment Input Area */}
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            <input
                          type="text"
                          value={text}
                          onChange={changeEventHandler}
              placeholder="Add a comment..."
              className="w-full outline-none text-sm border border-input bg-transparent px-3 py-2 rounded-md focus:border-ring"
            />
            <Button variant="outline" size="sm" onClick={sendMessageHandler} disabled={!text.trim()}>
              Send
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;