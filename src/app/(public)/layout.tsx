import Header from "@/components/header";
import { RecentlyViewedProvider } from "@/features/products/context/recently-viewed-context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecentlyViewedProvider>
      <Header />
      <main>{children}</main>
    </RecentlyViewedProvider>
  );
}
