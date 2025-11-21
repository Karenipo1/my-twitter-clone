import React from 'react';
import useRequireAuth from '../protected/hooks/useRequireAuth';

export default function ProfilePage(){
    const user = useRequireAuth();
    return (
    <div className="font-semibold text-[rgb(var(--color-text))] pt-8">Profile Page
    <h2>Hi user: {user.username}</h2>
    </div>

    );

}