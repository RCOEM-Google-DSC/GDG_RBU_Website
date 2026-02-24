import { BiCalendarEvent } from "react-icons/bi";
import {
  Users2,
  UserCog,
  FileText,
  PenSquare,
  CalendarPlus,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const Buttons = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: FileText,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: BiCalendarEvent,
  },
  {
    title: "Add Event",
    url: "/admin/events/add",
    icon: CalendarPlus ,
  },
  {
    title: "Create Blog",
    url: "/admin/blogs",
    icon: PenSquare,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users2,
  },
  {
    title: "Team Members",
    url: "/admin/team-members",
    icon: UserCog,
  },
  // {
  //   title: "Partners",
  //   url: "/admin/partners",
  //   icon: Handshake,
  // },
];

export default function SideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5 py-7 border-b-2">
        <h2 className="text-2xl font-sans font-semibold">Admin Dashboard</h2>
      </SidebarHeader>
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
  );
}
