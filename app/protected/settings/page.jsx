'use client';
import React from 'react';
import {useState} from 'react';
import { useSession } from "next-auth/react";
import RoundedButton from '../../components/RoundedButton';

export default function SettingsPage(){
    const { data: session, status } = useSession();
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
    
        try {
                const res = await fetch("/api/auth/update-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
                });
    
                const data = await res.json();
    
                if (res.ok) {
                    setMessage("Password updated successfully");
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                } else {
                    setMessage(data.error || "Error updating password");
                }
        } catch (err) {
                console.error(err);
                setMessage("Network error");
        }
    };
    
    if (status === "loading") {
        return <div className="p-10 text-center">Loading</div>;
    }
        
    if (!session) return <div>You must be logged in to access this page.</div>;
    

return (
    <>
    <div className="flex flex-col align-start w-full">
                <h1 className="text-2xl font-bold mt-4 px-0 py-3">Settings</h1>
                <p className="mb-4 text-xl">Change your password</p>

                <form onSubmit={handleSubmit} className="space-y-4 w-fit">
                    <div>
                    <input
                        placeholder="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                    <input
                        placeholder="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                    <input
                        placeholder="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div className='flex justify-end font-bold'> 
                    <RoundedButton
                    type="submit"
                    variant="primary">
                        Save
                    </RoundedButton>
                    </div>
                </form>
                {message && <p className="mt-4 text-sky-500">{message}</p>}
            </div>
    </>
);

}