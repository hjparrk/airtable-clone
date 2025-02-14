"use client";

import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import LoadingSpinner from "@/app/_components/common/LoadingSpinner";
import { useState } from "react";
import { Icons } from "@/app/_components/common/Icons";
import Sidebar from "@/app/_components/table/sidebar";

export default function TablePage() {
  const params = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const baseId = params.baseId as string;
  const tableId = params.tableId as string;

  const { data: table, isLoading } = api.tables.read.useQuery({
    id: tableId,
    baseId,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="h-full">
      {/* View Bar */}
      <nav className="flex h-11 w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-2 text-sm">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1 rounded-sm border-2 border-gray-100 bg-gray-100 px-2 py-1 font-medium hover:border-gray-300"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <Icons.Menu className="h-4 w-4" />
            <h1>Views</h1>
          </div>
          <div className="h-4 w-px bg-gray-400 opacity-50"></div>
          <div className="flex items-center gap-2 px-1.5 py-0.5 font-medium">
            <Icons.Table className="text-blue-600" />
            <h1>Grid view</h1>
            <Icons.People />
            <Icons.Down />
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5">
            <Icons.Hide />
            <h1>Hide fields</h1>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5">
            <Icons.Filter />
            <h1>Filter</h1>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5">
            <Icons.Group />
            <h1>Group</h1>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5">
            <Icons.Sort />
            <h1>Sort</h1>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5">
            <Icons.Color />
            <h1>Color</h1>
          </div>
          <div className="flex items-center px-1.5 py-0.5">
            <Icons.Text />
            <Icons.ArrowsVertical />
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5">
            <Icons.Share />
            <h1>Share and sync</h1>
          </div>
        </div>
        <div>
          <Icons.Search />
        </div>
      </nav>

      <div className="flex h-[calc(100vh-132px)] flex-row">
        {/* Side Bar */}
        {isSidebarOpen && <Sidebar />}

        {/* Table Content */}
        <div className="h-full flex-1 p-4">
          <h1 className="text-xl font-bold">{table?.name}</h1>
          <p>Table VIEW and CONTENT will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}
