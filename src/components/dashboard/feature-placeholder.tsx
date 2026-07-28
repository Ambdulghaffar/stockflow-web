import { LucideIcon } from "lucide-react";
import Link from "next/link";

import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

interface FeaturePlaceholderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export default function FeaturePlaceholder({
  icon: Icon,
  title,
  description = "Cette fonctionnalité est en cours de développement et sera bientôt disponible.",
}: FeaturePlaceholderProps) {
  return (
    <DashboardPageContainer>
      <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-br from-white via-pink-50/60 to-white shadow-sm">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-pink-300/30 to-pink-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-gradient-to-tr from-pink-200/40 to-rose-300/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-4 px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/30 ring-4 ring-white">
            <Icon className="h-8 w-8 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="max-w-md text-sm text-gray-500">{description}</p>
          <Button
            asChild
            className="mt-2 bg-pink-500 hover:bg-pink-600 text-white"
          >
            <Link href={ROUTES.DASHBOARD}>Retour au tableau de bord</Link>
          </Button>
        </div>
      </div>
    </DashboardPageContainer>
  );
}
