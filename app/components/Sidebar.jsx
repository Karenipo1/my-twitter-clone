import { Home, Search, Bell, Mail, User } from "lucide-react";
import Link from "next/link";
import PostButton from "./PostButton";

export default function Sidebar() {
    // Menu items for the sidebar
  const menuItems = [
    { name: "Home", icon: <Home size={24} />, path: "/" },
    { name: "Search", icon: <Search size={24} />, path: "/explore" },
    { name: "Notifications", icon: <Bell size={24} />, path: "/notifications" },
    { name: "Massages", icon: <Mail size={24} />, path: "/messages" },
    { name: "Profile", icon: <User size={24} />, path: "/profile" },
  ];

  return (
    <nav className="flex flex-col justify-between h-full">
      {/* Logo */}
      <div>
        <h1 className="text-4xl font-bold mb-6 p-2"><Link href="/">X</Link></h1>

        {/* Menu */}
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className="flex items-center gap-3 p-2 rounded-full hover:bg-gray-800 transition"
              >
                {item.icon}
              </Link>
            </li>
          ))}
          <li>
            
          </li>
        </ul>
        {/* Post Button */}
        <PostButton></PostButton>
      </div>
      
    </nav>
  );
}
