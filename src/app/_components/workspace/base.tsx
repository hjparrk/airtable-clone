import type { Base } from "@prisma/client";
import { Icons } from "../common/Icons";
import { useRouter } from "next/navigation";

export default function Base({ base }: { base: Base }) {
  const router = useRouter();

  const handleBaseClick = () => {
    router.push(`/${base.id}?`);
  };

  return (
    <button
      className="group flex w-full flex-row justify-between rounded-lg border bg-white px-4 py-8 shadow-sm hover:shadow-lg"
      onClick={handleBaseClick}
    >
      <p className="text-sm font-medium text-gray-800">{base.name}</p>
      <div className="hidden flex-row items-center gap-2 text-gray-400 group-hover:flex">
        <Icons.Star className="hover:cursor-pointer" />
        <Icons.ThreeDots className="hover:cursor-pointer" />
      </div>
    </button>
  );
}
