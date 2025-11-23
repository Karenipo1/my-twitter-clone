"use client"
import React from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function ProfilePage(){
    const user = useAuth();
    return (
    <div className="font-semibold text-[rgb(var(--color-text))] pt-8">Profile Page
    <h2>Hi user: {user.username}</h2>
    </div>

    );

}