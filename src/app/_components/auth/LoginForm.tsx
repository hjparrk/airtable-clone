"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm({ onToggle }: { onToggle: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
    } else {
      router.push("/workspace");
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
          disabled={isLoading}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded border p-2"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-blue-500 p-2 text-white disabled:bg-gray-400"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <button
          onClick={onToggle}
          className="text-blue-500 underline"
          disabled={isLoading}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
