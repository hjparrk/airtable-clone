"use client";

import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../_components/base/header";
import Tables from "../_components/base/tables";
import { useSession } from "next-auth/react";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const baseId = params.baseId as string;
  const tableId = params.tableId as string;

  const shouldFetch = status === "authenticated";

  const { data: base, isLoading: isBaseLoading } = api.bases.read.useQuery(
    { id: baseId },
    { enabled: shouldFetch },
  );

  const { data: tables, isLoading: isTablesLoading } =
    api.tables.readAll.useQuery({ baseId }, { enabled: shouldFetch });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (!isTablesLoading && tables?.length && !tableId) {
      router.replace(`/${baseId}/${tables[0]?.id}`);
    }
  }, [isTablesLoading, tables, baseId, tableId, router]);

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  if (isBaseLoading)
    return (
      <div className="flex h-screen flex-col">
        <header className="flex h-16 justify-between bg-green-700 px-6 py-4 text-white" />
      </div>
    );

  if (base && isTablesLoading) return <Header base={base} />;

  return (
    <div className="flex h-screen flex-col">
      {/* Base Name */}
      {base && <Header base={base} />}

      {/* Tables */}
      {baseId && tableId && tables && (
        <Tables baseId={baseId} tableId={tableId} tables={tables} />
      )}

      {/* Table Page */}
      <main className="h-full">{children}</main>
    </div>
  );
}
