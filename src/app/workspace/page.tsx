"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/_components/workspace/navbar";
import Sidebar from "@/app/_components/workspace/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../_components/common/LoadingSpinner";
import WorkspaceMain from "../_components/workspace/workspace-main";

export default function Workspace() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  /** Handle window size **/
  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 640;
      setIsSmallScreen(isSmall);
      setIsSidebarCollapsed(isSmall);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /** Redirect unauthenticated users **/
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative flex h-screen flex-col">
      <Navbar />

      <div className="relative flex flex-1">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          isSmallScreen={isSmallScreen}
        />

        <WorkspaceMain isSmallScreen={isSmallScreen} />
      </div>
    </div>
  );
}
