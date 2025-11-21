import "../globals.css";
import SideBar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";
import ClientOnly from "../components/ClientOnly";
import { TweetProvider } from "../context/TweetContext";
import { AuthProvider } from "../context/AuthContext";
import { verifyToken } from "@/lib/jwt";
import { COOKIE_NAME } from "@/lib/cookies";


export default function ProtectedLayout({ children }) {

  const token = cookies().get(COOKIE_NAME.AUTH_COOKIE_NAME)?.value;
  const userPayload = token ? verifyToken(token) : null;
  
  return (
    <AuthProvider initialUser={userPayload}>
      <TweetProvider>
        <div className="flex h-full">
          <aside className="md:w-1/12 lg:w-1/12 w-fit border-gray-100 p-2 justify-end sticky top-0 h-screen">
            <SideBar></SideBar>
          </aside>
          <main className="flex-1 flex  flex-col  sm:pb-0 min-w-0">
            {children}
          </main>
          <ClientOnly>
            <aside className="hidden lg:flex lg:w-1/3 border-gray-100 p-2">
              <RightPanel />
            </aside>
          </ClientOnly>
        </div>
        </TweetProvider>
    </AuthProvider>
  );
}
