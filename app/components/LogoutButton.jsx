"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    console.log("➡️ handleLogout clicked");
    const result = await logout();
    console.log("⬅️ logout() result:", result);
    
      console.log("🔁 Redirecting to /login");
      router.push("/login"); 
  };

  return (
    <button
      onClick={()=>{
        console.log("Button absolutely clicked!");
        handleLogout();
      }}
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