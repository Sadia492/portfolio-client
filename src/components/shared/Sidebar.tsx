"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut, Book, Menu, X } from "lucide-react";
import { useAuth } from "@/actions/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navigationItems = (
    <>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition-colors"
        onClick={() => setIsMobileOpen(false)}
      >
        <Home className="h-4 w-4" />
        Home
      </Link>

      <Link
        href="/dashboard/blogs"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition-colors"
        onClick={() => setIsMobileOpen(false)}
      >
        <Book className="h-4 w-4" />
        All Blogs
      </Link>

      <Link
        href="/dashboard/blogs/new"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition-colors"
        onClick={() => setIsMobileOpen(false)}
      >
        <PlusCircle className="h-4 w-4" />
        New Blog
      </Link>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-md"
      >
        {isMobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        flex h-screen w-64 flex-col border-r bg-black text-white
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">{navigationItems}</nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-500">
          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
