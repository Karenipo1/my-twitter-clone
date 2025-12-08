'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
    const { data: session, status } = useSession();

    return(
        <div className="top-0 bg-[rgb(var(--color-bg-hover))] border-b border-[rgb(var(--color-border))] p-4 space-y-2">
            <div className="flex flex-wrap  justify-start gap-x-2 text-[rgb(var(--color-text))]">
                <span > Welcome back</span>
                <span > {session.user.username}</span>
                <span className='font-semibold text-gray-700 px-4'>{session.user.email}</span>
                <div className="flex between ml-auto">
                <ThemeSwitcher className="h-6 w-6"/>
                </div>
            </div>
        </div>
    );
}