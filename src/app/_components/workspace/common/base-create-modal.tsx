"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function BaseCreateModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const utils = api.useUtils();
  const { mutate: createBase, isPending } = api.bases.create.useMutation({
    onSuccess: async (base) => {
      router.push(`/${base.id}/${base.tables[0]?.id}`);
      await utils.bases.readAll.invalidate();
    },
    onError: (error) => {
      // TODO
      alert(error.message);
    },
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold">How do you want to start?</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 flex gap-4">
          <button className="flex-1 cursor-pointer rounded-lg border p-4 hover:shadow-lg">
            <p className="font-medium">Build an app with AI</p>
            <p className="mt-1 text-xs text-gray-500">
              Cobuilder quickly turns your process into a custom app with data
              and interfaces.
            </p>
          </button>
          <button
            className="flex-1 cursor-pointer rounded-lg border p-4 hover:shadow-lg"
            onClick={() => {
              createBase();
            }}
            disabled={isPending}
          >
            <p className="font-medium">Start from scratch</p>
            <p className="mt-1 text-xs text-gray-500">
              Build your ideal workflow starting with a blank table.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
