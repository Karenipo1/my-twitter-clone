'use client';
import React from 'react';
import { useSession } from 'next-auth/react';

export default function Header() {
    const { data: session, status } = useSession();

    return(
        <div className="top-0 bg-[rgb(var(--color-bg-hover))] border-b border-[rgb(var(--color-border))] p-4 space-y-2">
            <div className="flex flex-wrap justify-start gap-x-2">
                <h1 className='text-sm font-bold text-sky-500'> Welcome back {session.user.username}!!</h1>
                <p className='text-sm font-semibold text-gray-700 px-4'>{session.user.email}</p>
            </div>
        </div>
    );
}