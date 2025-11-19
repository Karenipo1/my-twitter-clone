'use client';
import { useAuth } from "@/app/context/AuthContext"
import { useState } from "react"

export default function LoginForm(){
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

    return(
      <form onSubmit={onSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
    );
}