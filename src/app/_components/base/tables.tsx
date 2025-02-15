"use client";

import type { Table } from "@prisma/client";
import { Icons } from "../common/Icons";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

export default function Tables({
  baseId,
  tableId,
  tables,
}: {
  baseId: string;
  tableId: string;
  tables: Table[];
}) {
  const router = useRouter();
  const utils = api.useUtils();

  const { mutate: createTable, isPending } = api.tables.create.useMutation({
    onSuccess: async (table) => {
      router.push(`/${baseId}/${table.id}`);
      await utils.tables.readAll.invalidate();
    },
    onError: (error) => {
      // TODO
      alert(error.message);
    },
  });

  return (
    <div className="flex w-full gap-2 bg-green-700">
      {/* Left */}
      <section className="flex h-8 flex-1 divide-x divide-white divide-opacity-15 rounded-tr-md bg-green-800 pl-3">
        {tables?.map((table) => (
          <div
            key={table.id}
            className={`flex h-full items-center gap-1.5 rounded-t-sm px-4 text-xs transition ${
              table.id === tableId
                ? "bg-white font-medium text-black"
                : "text-white hover:bg-green-900"
            }`}
          >
            <button
              key={table.id}
              onClick={() => router.push(`/${baseId}/${table.id}`)}
            >
              {table.name}
            </button>
            {table.id === tableId && <Icons.Down className="h-3 w-3" />}
          </div>
        ))}
        <button className="flex w-12 items-center justify-center text-white hover:bg-green-900">
          <Icons.Down className="h-3 w-3" />
        </button>
        <button
          className="flex w-12 items-center justify-center text-white hover:bg-green-900"
          onClick={() => {
            createTable({ baseId });
          }}
        >
          <Icons.Add className="h-3 w-3" />
        </button>
      </section>

      {/* Left */}
      <section className="flex h-8 items-center gap-3 divide-white divide-opacity-30 rounded-tl-md bg-green-800 pr-3 text-sm">
        <button className="px-2 py-1 text-white">Extensions</button>
        <button className="flex items-center justify-between gap-1 px-2 py-1 text-white">
          <h1>Tools</h1>
          <Icons.Down className="h-3 w-3" />
        </button>
      </section>
    </div>
  );
}
