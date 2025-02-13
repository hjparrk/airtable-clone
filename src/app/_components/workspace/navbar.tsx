"use client";

import { Icons } from "../common/Icons";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-300 px-4 py-2 shadow-sm">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <Icons.Menu className="hidden h-6 w-6 cursor-pointer sm:flex" />
        <div className="flex items-center gap-1">
          <Icons.Airtable className="h-6 w-6" />
          <span className="text-lg font-semibold text-gray-700">Airtable</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative flex w-1/4 items-center">
        <Icons.Search className="absolute left-3 h-3.5 w-3.5 text-gray-600" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full border border-gray-300 py-1.5 pl-10 pr-8 text-sm text-gray-700 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
        />
        <span className="absolute right-3 text-xs text-gray-400">⌘ K</span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 rounded-full px-3 py-2 text-gray-700 hover:bg-gray-100">
          <Icons.Help className="h-3.5 w-3.5" />
          <span className="hidden text-sm font-medium xl:flex">Help</span>
        </button>

        <button className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100">
          <Icons.Bell className="h-3.5 w-3.5" />
        </button>

        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-800 text-sm text-white">
          H
        </button>
      </div>
    </nav>
  );
}
