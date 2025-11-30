import React from "react";
import RoundedButton from "@/app/components/RoundedButton";

export default function MessagesPage() {
  return (
  <div className="font-semibold text-[rgb(var(--color-text))] w-fit">
  <h1 className="text-2xl font-bold mt-4 px-0 py-3">Messages</h1>
  <h2 className="mb-4 text-xl">Welcome to your Inbox</h2>
  <span className="text-sm text-gray-500">
    Drop a line, share posts and more with private conversations between you and others on X.
  </span>
  <div className='flex justify-end mt-4'>
  <RoundedButton>
    Write a messages
  </RoundedButton>
  </div>
  </div>
  );
}