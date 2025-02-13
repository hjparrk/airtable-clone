import type { Base } from "@prisma/client";
import { Icons } from "../common/Icons";
import { useRouter } from "next/navigation";

export default function Header({ base }: { base: Base }) {
  const router = useRouter();

  return (
    <header className="flex h-14 justify-between bg-green-700 px-6 py-4 text-white">
      {/* Left */}
      <div className="flex min-w-[500] items-center gap-3">
        <Icons.Airtable
          className="h-5 w-5 hover:cursor-pointer"
          onClick={() => router.push("/workspace")}
        />
        <h1 className="text-lg font-semibold max-[500px]:hidden sm:block">
          {base?.name}
        </h1>
        <Icons.Down className="h-3.5 w-3.5" />
        <div className="flex items-center gap-2 text-xs">
          <h1 className="rounded-2xl bg-green-800 px-3 py-1.5">Data</h1>
          <h1 className="rounded-2xl px-3 py-1.5 hover:bg-green-800">
            Automations
          </h1>
          <h1 className="rounded-2xl px-3 py-1.5 hover:bg-green-800">
            Interfaces
          </h1>
          <div className="h-4 w-0 border-r border-gray-50 opacity-20" />
          <h1 className="rounded-2xl px-3 py-1.5 hover:bg-green-800">Forms</h1>
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center gap-3 text-sm">
        <div className="rounded-2xl px-3 py-2 hover:bg-green-800">
          <Icons.History />
        </div>
        <div className="flex items-center gap-1 rounded-2xl px-2 py-1 hover:bg-green-800">
          <Icons.Help />
          <h1>Help</h1>
        </div>
        <div className="flex items-center gap-1 rounded-2xl bg-white px-3 py-1 text-green-800 hover:cursor-pointer">
          <Icons.People />
          <h1>Share</h1>
        </div>
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-green-800">
          <Icons.Bell className="h-3.5 w-3.5" />
        </button>

        <button className="flex h-7 w-7 items-center justify-center rounded-full border border-white bg-purple-800 text-sm text-white">
          H
        </button>
      </div>
    </header>
  );
}
