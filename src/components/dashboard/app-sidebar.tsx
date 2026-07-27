"use client";

import * as React from "react";
import {
  ShoppingBag,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { UserMenu } from "@/components/dashboard/user-menu";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NAV_ITEMS, Role } from "@/constants/nav-items";
import { useSession } from "next-auth/react";

// This is sample data.
const data = {
  teams: [
    {
      name: "ElectroTech",
      logo: ShoppingBag,
      plan: "Boutique en ligne",
    }
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  initialRole?: Role;
}

export function AppSidebar({ initialRole, ...props }: AppSidebarProps) {
  const { data: session } = useSession();
  const sessionRole = session?.user?.roles?.[0] as Role | undefined;
  // initialRole vient du Server Component (déjà connu au premier rendu) :
  // il évite le flash de nav non filtrée pendant l'hydratation de useSession().
  const role = initialRole ?? sessionRole;

  const navMain = NAV_ITEMS.filter((item) => !role || item.roles.includes(role));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} role={role} />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu variant="sidebar" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
