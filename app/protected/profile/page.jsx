"use client";
import { useSession } from "next-auth/react";
import { CalendarDays } from "lucide-react";
import RoundedButton from "@/app/components/RoundedButton";


export default function ProfilePage(){
    const { data: session, status } = useSession();
    console.log("Session data:", session);

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (status === "unauthenticated") {
        return <div>You are not authorized to view this page.</div>;
    }
    
    return (
            <div className="w-full">
            <div className="flex flex-col align-middle w-full">
                <h1 className="text-2xl font-bold mt-4 px-0">Profile</h1>

                <div className="relative flex flex-col p-2">
                    <div className="w-full h-40 bg-gray-300">
                        <span className="text-gray-700 p-4 text-xs flex justify-start h-full">
                            Background image
                        </span>
                    </div>
                    <div className="absolute -bottom-10 left-4">
                        <div className="w-24 h-24 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-sm">
                            {session.user.username}
                        </div>
                    </div>
                    
                </div>
                <div className="flex justify-end px-4 mt-2 font-bold">
                    
                        <RoundedButton variant="secondary" >
                            Edit Profile
                        </RoundedButton>
                    
                </div>
                <div className="relative flex flex-col mt-8 gap-2 p-4">
                        <span className="text-xl font-bold">{session.user.username}</span>
                        <span className="txt-xm font-semibold text-gray-700">{session.user.email}</span>
                        <p className="flex text-sm">
                            <CalendarDays className="text-gray-500 w-4 h-4 align-bottom" /> Joined&nbsp;  
                            {new Date(session.user.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                </div>
            </div>                
            </div>
           
    );

}