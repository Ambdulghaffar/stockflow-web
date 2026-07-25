"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ChevronsUpDown, LayoutDashboard, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/route";
import { Role } from "@/constants/nav-items";
import { getUserMenuItems } from "@/constants/user-menu-items";

interface UserMenuProps {
  variant?: "sidebar" | "compact";
  showDashboardLink?: boolean;
}

function getInitials(name?: string | null): string {
  if (!name) return "N";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function UserMenu({
  variant = "sidebar",
  showDashboardLink = false,
}: UserMenuProps) {
  const { data: session } = useSession();
  const role = session?.user?.roles?.[0] as Role | undefined;
  const menuItems = getUserMenuItems(role);

  const handleLogout = async () => {
    await signOut({
      // signOut fait 3 choses :
      // 1. Il supprime le cookie de session NextAuth
      // 2. Il nettoie l'état local (useSession)
      // 3. Il redirige l'utilisateur (par défaut vers /login)
      callbackUrl: "/login",
      redirect: true,
    });
  };

  const menuContent = (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={session?.user?.image ?? ""}
              alt={session?.user?.name ?? ""}
            />
            <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{session?.user?.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {session?.user?.email}
            </span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {showDashboardLink && (
          <DropdownMenuItem asChild>
            <Link href={ROUTES.AUTH_REDIRECT}>
              <LayoutDashboard />
              Tableau de bord
            </Link>
          </DropdownMenuItem>
        )}
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href}>
              <item.icon />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
        <LogOut />
        Déconnexion
      </DropdownMenuItem>
    </>
  );

  if (variant === "sidebar") {
    return (
      <SidebarUserMenuTrigger
        name={session?.user?.name}
        image={session?.user?.image}
        role={role}
      >
        {menuContent}
      </SidebarUserMenuTrigger>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session?.user?.image ?? ""}
              alt={session?.user?.name ?? ""}
            />
            <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {menuContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface SidebarTriggerProps {
  name?: string | null;
  image?: string | null;
  role?: Role;
  children: ReactNode;
}

// Isolé dans son propre composant car useSidebar() exige un SidebarProvider
// (variant="sidebar" n'est monté que dans app/dashboard/layout.tsx, qui en fournit un ;
// le rendre inconditionnel dans UserMenu casserait variant="compact" dans header.tsx).
function SidebarUserMenuTrigger({
  name,
  image,
  role,
  children,
}: SidebarTriggerProps) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={image ?? ""} alt={name ?? ""} />
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight font-bold">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{role}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
