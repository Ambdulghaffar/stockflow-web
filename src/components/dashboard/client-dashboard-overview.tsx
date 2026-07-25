import { Heart, LucideIcon, MapPin, Receipt, UserCircle } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/constants/route";

interface QuickLink {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

const QUICK_LINKS: QuickLink[] = [
  {
    title: "Mes commandes",
    description: "Suivez l'état de vos commandes",
    icon: Receipt,
    href: ROUTES.DASHBOARD_ACCOUNT_ORDERS,
  },
  {
    title: "Mes adresses",
    description: "Gérez vos adresses de livraison",
    icon: MapPin,
    href: ROUTES.DASHBOARD_ACCOUNT_ADDRESSES,
  },
  {
    title: "Liste de souhaits",
    description: "Retrouvez vos produits favoris",
    icon: Heart,
    href: ROUTES.DASHBOARD_ACCOUNT_WISHLIST,
  },
  {
    title: "Mon profil",
    description: "Mettez à jour vos informations",
    icon: UserCircle,
    href: ROUTES.DASHBOARD_ACCOUNT_PROFILE,
  },
];

interface ClientDashboardOverviewProps {
  username: string;
}

export default function ClientDashboardOverview({
  username,
}: ClientDashboardOverviewProps) {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-br from-white via-pink-50/60 to-white p-8 shadow-sm">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-pink-300/30 to-pink-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-gradient-to-tr from-pink-200/40 to-rose-300/10 blur-3xl" />

        <div className="relative">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Bienvenue, {username}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Retrouvez ici l&apos;essentiel de votre compte.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map(({ title, description, icon: Icon, href }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-4 rounded-xl border border-pink-100/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-pink-100"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition-colors group-hover:bg-pink-500 group-hover:text-white">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{title}</p>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
