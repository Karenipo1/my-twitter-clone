'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      console.log("Login OK, redirigiendo a /protected...");
      // Termina loading antes de navegar
      setLoading(false);
      router.push("/protected");

    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
    };

    return(
    <div className="w-full overflow-hidden h-screen flex  bg-white">

      <div className="hidden md:flex w-1/2  items-start justify-center gap-6" >
        <span className="text-[24rem] font-bold text-black">X</span>
      </div>

      <div className="flex w-full md:w-1/2 flex-col items-start justify-start mt-6">
        <h1 className="text-6xl font-bold hidden md:block pb-10">Happening now</h1>
        <form
          onSubmit={onSubmit}
          className="bg-white w-full max-w-full md:max-w-sm rounded-lg p-8 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold mb-2">Join Today</h2>
            <div className="w-full flex flex-col gap-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                required
              />

              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                className="bg-black hover:bg-gray-700 text-white rounded-full py-2 mt-3"
              >
                Login
              </button>
              <div className="flex justify-center">
                <span className="font-bold">OR</span>
              </div>
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="border border-gray-400 text-gray-700 font-bold rounded-full py-2 hover:bg-gray-200 transition"
              >
                Create Account
              </button>
            </div>
        </form>
      </div>
    </div>
    );
}