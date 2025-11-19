"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Password does not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": form.csrfToken
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al registrar");
        setLoading(false);
        return;
      }

      // Redirect to login
      router.push("/login");
    } catch (err) {
      setError("Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-6 rounded-md shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Crear una cuenta</h2>

      {error && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          onChange={handleChange}
          value={form.username}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={handleChange}
          value={form.email}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={handleChange}
          value={form.password}
          required
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="border p-2 rounded"
          onChange={handleChange}
          value={form.confirmPassword}
          required
        />

        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mt-4"
        >
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </div>
    </form>
  );
}
