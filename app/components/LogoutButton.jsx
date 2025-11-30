"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleLogout}
      className="relative group z-50 flex items-center justify-center
      px-3 py-3
       hover:bg-gray-200 rounded-full transition
       cursor-pointer
       
       "
    >
      <LogOut size={22} />
      <span className="absolute
      top-full left-1/2 -translate-x-1/2
        bg-gray-400 text-white text-xs px-1 py-1 rounded-md 
       opacity-0 group-hover:opacity-100  
       pointer-events-none
       transition-opacity"
      >Logout
      </span>
    </button>
  );
}