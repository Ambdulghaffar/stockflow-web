"use client";

import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
  basePath: string;
}

interface Preset {
  label: string;
  startDate: string;
  endDate: string;
}

export default function DateRangeFilter({ basePath }: DateRangeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const today = dayjs();
  const presets: Preset[] = [
    {
      label: "7 jours",
      startDate: today.subtract(6, "day").format("YYYY-MM-DD"),
      endDate: today.format("YYYY-MM-DD"),
    },
    {
      label: "30 jours",
      startDate: today.subtract(29, "day").format("YYYY-MM-DD"),
      endDate: today.format("YYYY-MM-DD"),
    },
    {
      label: "Ce mois-ci",
      startDate: today.startOf("month").format("YYYY-MM-DD"),
      endDate: today.format("YYYY-MM-DD"),
    },
    {
      label: "Cette année",
      startDate: today.startOf("year").format("YYYY-MM-DD"),
      endDate: today.format("YYYY-MM-DD"),
    },
  ];

  const currentStartDate = searchParams.get("startDate");
  const currentEndDate = searchParams.get("endDate");

  const handleSelect = (preset: Preset) => {
    const params = new URLSearchParams();
    params.set("startDate", preset.startDate);
    params.set("endDate", preset.endDate);
    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((preset) => {
        // Le backend fait défaut aux 30 derniers jours quand l'URL n'a aucun
        // paramètre — on met donc "30 jours" en surbrillance dans ce cas.
        const isActive =
          (currentStartDate === preset.startDate &&
            currentEndDate === preset.endDate) ||
          (!currentStartDate && !currentEndDate && preset.label === "30 jours");

        return (
          <Button
            key={preset.label}
            type="button"
            size="sm"
            variant={isActive ? "default" : "outline"}
            className={cn(isActive && "bg-pink-600 hover:bg-pink-700")}
            onClick={() => handleSelect(preset)}
          >
            {preset.label}
          </Button>
        );
      })}
    </div>
  );
}
