'use client';
import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import {useState, useEffect} from 'react';

export default function SettingsPage(){
    const {user} = useAuth();
    
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
                credentials: "include",
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
    
        if (!user) return <div>Loading...</div>;
    

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
                    <div className='flex justify-end'>
                    <button
                    type="submit"
                    className="bg-black hover:bg-gray-700 text-white rounded-full py-2 px-4 mt-3"
                    >
                    Save
                    </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-sky-500">{message}</p>}
            </div>
    </>
);

}