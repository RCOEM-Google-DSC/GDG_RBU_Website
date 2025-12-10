import React from 'react'
import { redirect } from 'next/navigation'
import SideBar from '../Components/Admin/SideBar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <div className="flex w-full" style={{ minHeight: 'calc(100vh - 74px)' }}>
        <SideBar />
        <SidebarInset className="flex-1">
          {/* Sidebar trigger and header */}
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 transition-all duration-300">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </header>
          <main className="p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}