"use client";

import { useState, type ReactNode } from "react";
import { Icons } from "../common/Icons";
import { cn } from "@/utils/tailwind-utils";
import BaseCreateModal from "./common/base-create-modal";

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isSmallScreen,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isSmallScreen: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const collapsed = (
    <nav className="flex h-full flex-col items-center py-4">
      <button className="mb-4 text-gray-700">
        <Icons.Home />
      </button>
      <button className="mb-4 text-gray-700">
        <Icons.People />
      </button>
      <hr className="w-10 border-t border-gray-300" />
      <div className="flex-1"></div>
      <hr className="mb-3 w-10 border-t border-gray-300" />
      <button className="mb-4 text-gray-700">
        <Icons.Book />
      </button>
      <button className="mb-4 text-gray-700">
        <Icons.Marketplace />
      </button>
      <button className="mb-4 text-gray-700">
        <Icons.Globe />
      </button>
      <button className="mb-4 text-gray-700">
        <Icons.Import />
      </button>
      <button className="mb-4 text-gray-700">
        <Icons.AddSquare />
      </button>
    </nav>
  );

  const expanded = (
    <nav className="flex h-full w-72 flex-col items-start p-3 text-sm">
      {/** UPPER BUTTONS **/}
      <UpperBtnWrapper>
        <button className="font-semibold text-gray-700">Home</button>
        <Icons.Right />
      </UpperBtnWrapper>
      <UpperBtnWrapper>
        <button className="font-semibold text-gray-700">All Workspaces</button>
        <div className="flex flex-row gap-3">
          <Icons.Add />
          <Icons.Down />
        </div>
      </UpperBtnWrapper>
      <WorkspaceBtnWrapper>
        <Icons.People />
        <button className="text-xs">My First Workspace</button>
      </WorkspaceBtnWrapper>

      {/** DIVIDER **/}
      <div className="flex-1"></div>
      <hr className="mb-3 w-full border-t border-gray-300" />

      {/** LOWER BUTTONS **/}
      <LowerBtnWrapper>
        <Icons.Book />
        <button className="text-gray-700">Templates and apps</button>
      </LowerBtnWrapper>
      <LowerBtnWrapper>
        <Icons.Marketplace />
        <button className="text-gray-700">Marketplace</button>
      </LowerBtnWrapper>
      <LowerBtnWrapper>
        <Icons.Import />
        <button className="text-gray-700">Import</button>
      </LowerBtnWrapper>

      <button
        className="my-2 w-full rounded-md bg-blue-600 px-2 py-2 text-white"
        onClick={() => {
          setIsModalOpen((prev) => !prev);
        }}
      >
        + Create
      </button>
    </nav>
  );

  return (
    <aside
      className={cn(
        "absolute left-0 top-0 z-50 h-full border-r border-gray-200 bg-white shadow-md transition-all duration-75 sm:relative",
        isCollapsed ? "w-12" : "w-72",
      )}
      onMouseEnter={() => isSmallScreen && setIsCollapsed(false)}
      onMouseLeave={() => isSmallScreen && setIsCollapsed(true)}
    >
      {isCollapsed ? collapsed : expanded}

      {isModalOpen && <BaseCreateModal onClose={() => setIsModalOpen(false)} />}
    </aside>
  );
}

function UpperBtnWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1 flex w-full items-center justify-between rounded-sm px-2 py-3 hover:bg-gray-100">
      {children}
    </div>
  );
}

function LowerBtnWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1 flex w-full items-center justify-start gap-2 rounded-sm px-2 py-1">
      {children}
    </div>
  );
}

function WorkspaceBtnWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1 flex w-full items-center justify-start gap-2 rounded-sm bg-gray-100 px-2 py-3">
      {children}
    </div>
  );
}
