"use client";

import { useState } from "react";
import PostComposer from "./PostComposer";
import { useTweetContext } from "../context/TweetContext";

export default function PostModal() {
  const [open, setOpen] = useState(false);
  const {triggerRefresh} = useTweetContext();
  

  return (
    <>
      {/* main button*/}
      
          <div 
          onClick={() => setOpen(true)}
          className="relative group flex justify-center mt-6">
            {/* Rounded button*/}
            <div className="bg-black border border-gray-700
             hover:bg-gray-900 transition-all rounded-full 
             w-12 h-12 flex items-center justify-center 
             cursor-pointer">
                {/* SVG Pen */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                >
                <path d="M16 3a4 4 0 0 1 5 5l-9 9H7v-5l9-9zM13 6l5 5" />
                </svg>
            </div>

            {/* Tooltip  */}
            <span className="absolute left-1/2 top-full -translate-x-1/2
             bg-gray-900 text-white text-xs 
             px-1 py-1 rounded-md 
             opacity-0 group-hover:opacity-100 
             transition-opacity">
                Post
            </span>
            </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[rgb(var(--color-bg))] w-full max-w-lg rounded-2xl shadow-xl p-4 border border-gray-700 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
            
            <PostComposer
              onPostSuccess={() => {
                setOpen(false);
                triggerRefresh();
              }} 
              onClose={ () => setOpen(false)}
            />
            
          </div>
        </div>
      )}
    </>
  );
}
