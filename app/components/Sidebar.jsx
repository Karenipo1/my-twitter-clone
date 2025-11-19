import { Home, Search, Bell, Mail, User } from "lucide-react";
import Link from "next/link";
import ClientOnly from "./ClientOnly";
import PostModal from "./PostModal";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
    // Menu items for the sidebar
  const menuItems = [
    { name: "Home", icon: <Home size={24} />, path: "/" },
    { name: "Search", icon: <Search size={24} />, path: "/explore" },
    { name: "Notifications", icon: <Bell size={24} />, path: "/notifications" },
    { name: "Messages", icon: <Mail size={24} />, path: "/messages" },
    { name: "Profile", icon: <User size={24} />, path: "/profile" },
  ];

  return (
    <>
    <nav className="
    hidden sm:flex
    flex-col
    justify-between
    h-full
    p-2
    ">
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
              <span className="hidden md:block absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                {item.name}
            </span>
            </li>
          ))}
          <li>
            <LogoutButton></LogoutButton>
          </li>
        </ul>
        {/* Post Button */}
        <ClientOnly>
        <PostModal />
        </ClientOnly>
      </div>
      
    </nav>

    <nav className="sm:hidden fixed bottom-0 left-0 w-full overflow-x-hidden bg-[rgb(var(--color-bg))] border-t border-[rgb(var(--color-border))] flex justify-around items-center py-2 z-40">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex flex-col items-center justify-center text-gray-400 hover:text-sky-500 transition"
          >
            {item.icon}
          </Link>
        ))}
    </nav>

    <div className="sm:hidden fixed bottom-16 right-5 z-50">
      <ClientOnly>
        <PostModal />
      </ClientOnly>
    </div>

    </>
  );
}
