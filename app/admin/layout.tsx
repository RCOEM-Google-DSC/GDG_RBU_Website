"use client";

import React from "react";
import SideBar from "../Components/Admin/SideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useRBAC } from "@/hooks/useRBAC";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { canAccessAdminPanel, loading } = useRBAC();
  const router = useRouter();

  // Show loading state while checking permissions
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if user doesn't have permission
  if (!canAccessAdminPanel) {
    router.push("/");
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex w-full" style={{ minHeight: "calc(100vh - 74px)" }}>
        <SideBar />
        <SidebarInset className="flex-1">
          {/* Sidebar trigger and header */}
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 transition-all duration-300 mt-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </header>
          <main className="p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
