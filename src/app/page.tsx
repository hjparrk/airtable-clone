import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import AuthForms from "./_components/auth/AuthForms";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/workspace");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Welcome to{" "}
            <span className="text-[hsl(280,100%,70%)]">Airtable-clone</span> App
          </h1>
          <AuthForms />
        </div>
      </main>
    </HydrateClient>
  );
}
