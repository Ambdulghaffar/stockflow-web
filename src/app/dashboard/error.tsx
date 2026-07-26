"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Point d'accroche pour un futur service de monitoring (Sentry ou équivalent).
    console.error("Erreur applicative:", error);
  }, [error]);

  return (
    <div className="space-y-8">
      <SidebarBreadcrumb />
      <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-white via-red-50/40 to-white shadow-sm">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-red-300/30 to-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-gradient-to-tr from-orange-200/40 to-red-300/10 blur-3xl" />

        <div className="relative flex flex-col items-center gap-4 px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30 ring-4 ring-white">
            <AlertTriangle className="h-8 w-8 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Une erreur est survenue dans cette section
          </h1>
          <p className="max-w-md text-sm text-gray-500">
            Impossible d&apos;afficher cette page pour le moment.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => reset()}
              className="cursor-pointer"
            >
              Réessayer
            </Button>
            <Button
              asChild
              className="bg-pink-500 text-white hover:bg-pink-600"
            >
              <Link href={ROUTES.DASHBOARD}>Retour au tableau de bord</Link>
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && (
            <pre className="mt-4 w-full max-w-md overflow-auto rounded-lg bg-gray-50 p-3 text-left text-xs text-gray-500">
              {error.message}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
