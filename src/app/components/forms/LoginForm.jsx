'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import RoundedButton from "../RoundedButton";

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
      const result = await signIn("credentials", {
        redirect: false,   // No automatic redirect
        email,
        password
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/protected"); // Redirect to protected page on success
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
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
          {error && (
            <div className="text-red-600 bg-red-100 border border-red-300 px-3 py-2 rounded">
              {error === "NoUser" && "We couldn't find an account with this email"}
              {error === "WrongPassword" && "the password you entered is incorrect"}
              {error !== "NoUser" && error !== "WrongPassword" && error}
            </div>
          )}
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

              <RoundedButton
                type="submit"
                variant="primary"
              >
                Login
              </RoundedButton>

              <div className="flex justify-center">
                <span className="font-bold">OR</span>
              </div>

              <RoundedButton
                type="button"
                variant="secondary"
                onClick={() => router.push("/register")}
              >
                Create Account
              </RoundedButton>
            </div>
        </form>
      </div>
    </div>
    );
}