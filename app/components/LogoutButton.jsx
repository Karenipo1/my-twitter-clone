"use client";

import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="text-gray-500 px-4 py-2 hover:bg-red-100 rounded"
    >
      Logout
    </button>
  );
}