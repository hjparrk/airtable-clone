"use client";

import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import LoadingSpinner from "@/app/_components/common/LoadingSpinner";
import { useState } from "react";
import { Icons } from "@/app/_components/common/Icons";
import Sidebar from "@/app/_components/table/sidebar";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columns = [
  { id: "name", accessorKey: "name", header: "Name" },
  { id: "email", accessorKey: "email", header: "Email" },
  { id: "age", accessorKey: "age", header: "Age" },
];

const defaultData = [
  { id: "1", name: "", email: "", age: "" },
  { id: "2", name: "", email: "", age: "" },
  { id: "3", name: "", email: "", age: "" },
];

export default function TablePage() {
  const params = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const tableInstance = useReactTable({
    data: defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
      <nav className="flex h-11 w-full items-center justify-between bg-white px-4 py-2 text-sm">
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
        <div className="h-full w-full border border-gray-300">
          <table className="border-collapse">
            <thead className="h-8 border">
              <tr>
                {tableInstance.getFlatHeaders().map((header, index) => (
                  <th
                    key={header.id}
                    className="w-40 border bg-gray-100 px-2 text-left text-sm font-normal"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
                <th className="w-12 bg-gray-100 px-2">
                  <button>
                    <Icons.Add className="h-4 w-4" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableInstance.getRowModel().rows.map((row, rowIdx) => (
                <tr key={row.id} className="h-8">
                  {row.getVisibleCells().map((cell, cellIdx) => (
                    <td
                      key={cell.id}
                      className="border border-gray-300 px-2 py-1 text-xs font-normal"
                    >
                      {cellIdx === 0 ? rowIdx + 1 : null}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
