import { BadgeCheck, Bell, Settings } from "lucide-react";
import { ROUTES } from "./route";
import { Role } from "./nav-items";

export interface UserMenuItem {
  label: string;
  icon: typeof BadgeCheck;
  href: string;
  roles?: Role[]; // undefined = visible pour tous les rôles connectés
}

export function getUserMenuItems(role?: Role): UserMenuItem[] {
  const profileHref = role === "CLIENT" ? ROUTES.DASHBOARD_ACCOUNT_PROFILE : ROUTES.DASHBOARD_PROFILE;

  const items: UserMenuItem[] = [
    { label: "Notifications", icon: Bell, href: ROUTES.DASHBOARD_NOTIFICATIONS },
    { label: "Profil", icon: BadgeCheck, href: profileHref },
  ];

  if (role === "ADMIN") {
    items.push({ label: "Paramètres", icon: Settings, href: ROUTES.DASHBOARD_SETTINGS_COMPANY });
  }

  return items;
}
