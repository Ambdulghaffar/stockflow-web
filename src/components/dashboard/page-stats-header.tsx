import { LucideIcon } from "lucide-react";

interface StatItem {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
}

interface PageStatsHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: StatItem[];
}

export default function PageStatsHeader({
  icon: Icon,
  title,
  description,
  stats,
}: PageStatsHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-br from-white via-pink-50/60 to-white shadow-sm">
      {/* Décor : halos dégradés flous en arrière-plan, purement décoratifs */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-pink-300/30 to-pink-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-gradient-to-tr from-pink-200/40 to-rose-300/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        {/* Titre + icône */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/30 ring-4 ring-white">
            <Icon className="h-7 w-7 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 whitespace-nowrap">
              {title}
            </h1>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>

        {/* Séparateur vertical, visible seulement en desktop */}
        <div className="hidden h-16 w-px bg-gradient-to-b from-transparent via-pink-200 to-transparent lg:block" />

        {/* Statistiques */}
        <div className="flex flex-1 flex-wrap gap-4 lg:justify-end">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={index}
                className="group flex min-w-[220px] flex-1 items-center gap-4 rounded-xl border border-pink-100/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-pink-100 lg:max-w-[280px]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition-colors group-hover:bg-pink-500 group-hover:text-white">
                  <StatIcon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold leading-tight text-gray-900">
                    {stat.value}
                  </p>
                  <p className="truncate text-xs font-medium text-gray-500">
                    {stat.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}