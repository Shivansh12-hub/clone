import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CommentDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-4xl h-[80vh] overflow-hidden flex flex-col md:flex-row gap-0">
        
        {/* Left Side: Post Image Container */}
        <div className="w-full md:w-[55%] h-1/2 md:h-full bg-black flex items-center justify-center">
          <img
            src="https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?cs=srgb&dl=cascade-clouds-cool-wallpaper-210186.jpg&fm=jpg"
            alt="Modal banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Header & Comments Area */}
        <div className="w-full md:w-[45%] h-1/2 md:h-full flex flex-col justify-between p-4 bg-background">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-none">username</span>
                <span className="text-xs text-muted-foreground">Location or Bio</span>
              </div>
            </div>
          </div>

          {/* Comments Scroll Area (Placeholder for list) */}
          <div className="flex-1 overflow-y-auto py-3">
            <p className="text-xs text-muted-foreground">No comments yet.</p>
          </div>

          {/* Footer / Input Area (Placeholder) */}
          <div className="pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Comment input goes here...</p>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;