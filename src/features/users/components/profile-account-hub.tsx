import { Heart, LucideIcon, MapPin, Receipt } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/constants/route";

interface QuickLink {
  title: string;
  icon: LucideIcon;
  href: string;
}

const QUICK_LINKS: QuickLink[] = [
  {
    title: "Mes commandes",
    icon: Receipt,
    href: ROUTES.DASHBOARD_ACCOUNT_ORDERS,
  },
  {
    title: "Mes adresses",
    icon: MapPin,
    href: ROUTES.DASHBOARD_ACCOUNT_ADDRESSES,
  },
  {
    title: "Liste de souhaits",
    icon: Heart,
    href: ROUTES.DASHBOARD_ACCOUNT_WISHLIST,
  },
];

export default function ProfileAccountHub() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Mon compte en un coup d&apos;œil
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {QUICK_LINKS.map(({ title, icon: Icon, href }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-4 rounded-xl border border-pink-100/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-pink-100"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition-colors group-hover:bg-pink-500 group-hover:text-white">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <p className="font-medium text-gray-900">{title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
