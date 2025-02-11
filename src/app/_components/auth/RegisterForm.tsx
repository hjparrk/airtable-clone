"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export default function RegisterForm({ onToggle }: { onToggle: () => void }) {
  const [error, setError] = useState("");
  const { mutate: register, isPending } = api.auth.register.useMutation({
    onSuccess: () => {
      alert("Account created! Please sign in.");
      onToggle();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    register({ email, password });
  };

  return (
    <div className="w-96 rounded bg-white p-6 text-black shadow-md">
      <h2 className="mb-4 text-xl font-bold">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded border p-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded border p-2"
        />
        <button
          type="submit"
          className="w-full rounded bg-green-500 p-2 text-white"
        >
          {isPending ? "Registering..." : "Register"}
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <button onClick={onToggle} className="text-blue-500 underline">
          Log in
        </button>
      </p>
    </div>
  );
}
