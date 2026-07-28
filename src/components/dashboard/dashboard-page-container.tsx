import SidebarBreadcrumb from "./sidebar-breadcrumb";

interface DashboardPageContainerProps {
  breadcrumbValues?: Record<string, string>;
  children: React.ReactNode;
}

export default function DashboardPageContainer({
  breadcrumbValues,
  children,
}: DashboardPageContainerProps) {
  return (
    <>
      <SidebarBreadcrumb values={breadcrumbValues} />
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </>
  );
}
