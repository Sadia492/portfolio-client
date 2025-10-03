// app/(dashboard)/dashboard/layout.tsx
import Sidebar from "@/components/shared/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen lg:sticky lg:top-0 lg:z-20 bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full overflow-auto">
        <div className="min-h-screen">{children}</div>
      </div>
    </div>
  );
}
