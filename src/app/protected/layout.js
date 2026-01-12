import "../globals.css";
import SideBar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";
import ClientOnly from "../components/ClientOnly";
import { TweetProvider } from "../context/TweetContext";
import { NextAuthProvider } from "../providers";


export default async function ProtectedLayout({ children }) {
  
  return (
    <NextAuthProvider>
      <TweetProvider>
        <div className="flex h-full">
          <aside className="md:w-1/12 lg:w-1/12  border-gray-100 p-2 justify-end sticky top-0 h-screen">
            <SideBar></SideBar>
          </aside>
          <main className="flex-1 flex  flex-col  sm:pb-0 min-w-0">
            {children}
          </main>
          
            <aside className="hidden lg:flex lg:w-1/3 border-gray-100">
              <RightPanel />
            </aside>
          
        </div>
        </TweetProvider>
    </NextAuthProvider>
  );
}
