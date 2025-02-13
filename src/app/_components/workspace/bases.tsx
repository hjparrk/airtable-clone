"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import LoadingSpinner from "../common/LoadingSpinner";
import BaseCreateModal from "@/app/_components/workspace/common/base-create-modal";
import Base from "./base";

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
    <div className="py-6 pr-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        {bases.map((base) => (
          <Base key={base.id} base={base} />
        ))}
      </div>

      {isModalOpen && <BaseCreateModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
