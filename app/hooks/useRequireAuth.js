'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function useRequireAuth(){
    const {user, loading} = useAuth();
    const router = useRouter();

    useEffect(()=>{
        if (!loading && !user){
            router.push("/login");
        }
    },[loading,user,router]);

    //while it is loading
    if (loading){
        //spinner
        return null;
    }
    return user;
}
