// app/(dashboard)/dashboard/layout.tsx
import Sidebar from "@/components/shared/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed but responsive */}
      <div className="fixed lg:static inset-y-0 left-0 z-40">
        <Sidebar />
      </div>

      {/* Main Content - Responsive spacing */}
      <div className="flex-1 w-full lg:w-auto transition-all duration-300">
        <div className="min-h-screen overflow-auto">{children}</div>
      </div>
    </div>
  );
}
