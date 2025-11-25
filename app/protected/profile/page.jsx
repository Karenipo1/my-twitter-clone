"use client";
import { useAuth } from '@/app/context/AuthContext';
import { useState, useEffect } from 'react';

export default function ProfilePage(){
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
                <h1 className="text-2xl font-bold mt-4 px-0 py-3">Profile</h1>
                <h2>name</h2>
                <div>
                    <span>bg profile</span>
                </div>
                <span>  name</span>
                <span>  account</span>
                <span>  date</span>
            </div>
            </>
    );

}