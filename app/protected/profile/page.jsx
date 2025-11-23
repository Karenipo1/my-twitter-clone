"use client"
import {useState} from 'react';
import { useAuth } from '@/app/context/AuthContext';

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
            <div className="max-w-md mx-auto p-4">
                <h1 className="text-xl font-bold px-4 py-3">Profile</h1>
                <p className="mb-4">Welcome, <strong>{user.name}</strong></p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <label className="block mb-1">Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                    <label className="block mb-1">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <div>
                    <label className="block mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    </div>
                    <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                    >
                    Save
                    </button>
                </form>
                {message && <p className="mt-4 text-red-500">{message}</p>}
            </div>

    );

}