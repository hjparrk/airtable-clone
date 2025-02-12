import { cn } from "@/utils/tailwind-utils";
import { Icons } from "../common/Icons";
import Bases from "./bases";

export default function WorkspaceMain({
  isSmallScreen,
}: {
  isSmallScreen: boolean;
}) {
  return (
    <main
      className={cn(
        "relative flex w-full justify-between gap-2 bg-gray-50 p-10",
        isSmallScreen ? "ml-12" : null,
      )}
    >
      {/* Left Section: Workspace Title & Bases */}
      <section className="flex flex-1 flex-col pr-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          Workspace
          <span className="inline-flex items-center rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">
            FREE PLAN <span className="mx-1">•</span>
            <button className="text-xs font-semibold text-blue-600 hover:underline">
              UPGRADE
            </button>
          </span>
          <Icons.Star className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700" />
        </h1>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <button className="flex items-center gap-1 hover:underline">
              Opened by you <Icons.Down className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-1 hover:underline">
              Show all types <Icons.Down className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button className="rounded-full p-2 hover:bg-gray-200">
              <Icons.Menu className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-200">
              <Icons.Box className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <Bases />
      </section>

      {/* Right Section: Collaborators */}
      <section className="flex w-48 flex-col items-start pt-12">
        <div className="absolute right-24 top-8 flex flex-row gap-1">
          <button className="rounded-md border bg-white px-3 py-1.5 text-sm">
            Share
          </button>
          <button className="rounded-md border bg-white px-3 py-1.5 text-sm">
            •••
          </button>
        </div>
        <h2 className="text-sm font-semibold text-gray-700">Collaborators</h2>
        <div className="mt-2 flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs text-white">
            H
          </div>
          <span className="text-sm text-gray-700">You (owner)</span>
        </div>
      </section>
    </main>
  );
}
