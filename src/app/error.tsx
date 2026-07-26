"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Point d'accroche pour un futur service de monitoring (Sentry ou équivalent).
    console.error("Erreur applicative:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-white px-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-red-100 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30 ring-4 ring-white">
          <AlertTriangle className="h-8 w-8 text-white" strokeWidth={2} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Une erreur est survenue
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Quelque chose s&apos;est mal passé. Vous pouvez réessayer ou
          retourner à l&apos;accueil.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
            <Link href={ROUTES.HOME}>Retour à l&apos;accueil</Link>
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <pre className="mt-6 overflow-auto rounded-lg bg-gray-50 p-3 text-left text-xs text-gray-500">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  );
}
