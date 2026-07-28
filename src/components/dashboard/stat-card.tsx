import { Card, CardContent } from "@/components/ui/card";
import { LucideProps, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  iconBgColor?: string;
  description?: string;
  trend?: { value: number; direction: "up" | "down" };
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconBgColor = "bg-gray-100",
  description,
  trend,
}: StatCardProps) {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className="mt-1 text-xs text-gray-500">{description}</p>
            )}
            {trend && (
              <div
                className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  trend.direction === "up"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {trend.direction === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {trend.value}%
              </div>
            )}
          </div>
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBgColor} shadow-md ring-4 ring-white transition-transform duration-200`}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
