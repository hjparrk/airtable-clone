"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import LoadingSpinner from "../common/LoadingSpinner";
import BaseCreateModal from "@/app/_components/workspace/common/base-create-modal";

export default function Bases() {
  const { data: bases, isLoading } = api.bases.readAll.useQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!bases || bases.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h1 className="text-lg font-semibold">This workspace is empty</h1>
        <p className="mt-2 text-sm text-gray-500">
          Bases and interfaces in this workspace will appear here.
        </p>
        <button
          className="mt-4 rounded-md border bg-white px-3 py-1.5 text-sm font-medium"
          onClick={() => {
            setIsModalOpen((prev) => !prev);
          }}
        >
          Create
        </button>

        {isModalOpen && (
          <BaseCreateModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      {bases.map((base) => (
        <div key={base.id} className="rounded-lg border p-4 shadow-sm">
          <p className="text-gray-800">{base.name}</p>
        </div>
      ))}

      {isModalOpen && <BaseCreateModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
