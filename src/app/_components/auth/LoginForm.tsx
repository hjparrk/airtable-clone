"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm({ onToggle }: { onToggle: () => void }) {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-96 rounded bg-white p-6 text-black shadow-md">
      <h2 className="mb-4 text-xl font-bold">Login</h2>
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
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          Sign In
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <button onClick={onToggle} className="text-blue-500 underline">
          Sign Up
        </button>
      </p>
    </div>
  );
}
