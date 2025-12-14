import { BiCalendarEvent } from "react-icons/bi"; 
import { Calendar, ClipboardList, Handshake, Home, Inbox, Users2 } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator";

// Menu items.
const Buttons = [
  {
    title: "Events",
    url: "/admin/events",
    icon: BiCalendarEvent,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users2,
  },
  {
    title: "Partners",
    url: "/admin/partners",
    icon: Handshake,
  },
]

export default function SideBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {Buttons.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-5">
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}