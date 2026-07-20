// components/dashboard/dynamic-breadcrumb.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BREADCRUMB_MAP } from "@/constants/breadcrumb-map";
import React from "react";

interface DynamicBreadcrumbProps {
  // prop optionnelle pour remplacer les IDs par des labels lisibles
  values?: Record<string, string>;
}

const getLabel = (segment: string, values?: Record<string, string>): string => {
  // 1. Priorité au label custom passé en prop (ex: nom de l'utilisateur)
  if (values?.[segment]) return values[segment];

  // 2. ID numérique sans label custom → masqué dans le breadcrumb
  if (/^\d+$/.test(segment)) return "";

  // 3. Segment connu dans la map → label traduit
  return BREADCRUMB_MAP[segment.toLowerCase()] ?? segment;
};

export default function DynamicBreadcrumb({ values }: DynamicBreadcrumbProps) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  // Segments qui ne correspondent à aucune page navigable en eux-mêmes
  // (ex: /dashboard/categories/update n'existe pas, seul /update/[id] existe)
  const NON_NAVIGABLE_SEGMENTS = new Set(["update", "edit", "create", "new"]);

  const breadcrumbs = segments
    .map((segment, index) => ({
      href: "/" + segments.slice(0, index + 1).join("/"),
      label: getLabel(segment, values),
      isNavigable: !NON_NAVIGABLE_SEGMENTS.has(segment.toLowerCase()),
    }))
    .filter(({ label }) => label !== "")
    .map((item, index, filteredArray) => ({
      ...item,
      isLast: index === filteredArray.length - 1,
    }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map(({ href, label, isLast, isNavigable }, index) => (
          <React.Fragment key={href}>
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {isLast || !isNavigable ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
