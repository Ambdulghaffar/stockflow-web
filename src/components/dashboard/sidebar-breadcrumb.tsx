// components/dashboard/sidebar-breadcrumb.tsx
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { UserMenu } from "./user-menu";
import DynamicBreadcrumb from "./dynamic-breadcrumb";

interface SidebarBreadcrumbProps {
  values?: Record<string, string>;
}

export default function SidebarBreadcrumb({ values }: SidebarBreadcrumbProps) {
  return (
    <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <DynamicBreadcrumb values={values} />
      </div>
      <div className="flex items-center gap-2 px-4">
        <UserMenu variant="compact" showDashboardLink={false} />
      </div>
    </header>
  );
}