"use client";

import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import LoadingSpinner from "@/app/_components/common/LoadingSpinner";

export default function TablePage() {
  const params = useParams();
  const baseId = params.baseId as string;
  const tableId = params.tableId as string;

  const { data: table, isLoading } = api.tables.read.useQuery({
    id: tableId,
    baseId,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{table?.name}</h1>
      <p>Table content will be displayed here.</p>
    </div>
  );
}
