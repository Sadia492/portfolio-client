"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavigationSheet } from "./navigation-sheet";
import { NavMenu } from "./nav-menu";
import { Logo } from "./Logo";
import { useAuth } from "@/actions/useAuth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // Refresh the page to update all components
    router.refresh();
  };

  return (
    <nav className="fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto rounded-full bg-background border dark:border-slate-700/70 z-30">
      <div className="flex h-full items-center justify-between px-6 md:px-8">
        {/* Logo with consistent padding */}
        <Link href="/" className="flex-shrink-0 ">
          <Logo />
        </Link>

        {/* Desktop Menu with consistent horizontal spacing */}
        <NavMenu className="hidden md:block" />

        {/* Actions and Mobile Menu */}
        <div className="flex items-center gap-4 md:gap-6">
          {isLoading ? (
            <div className="w-20 h-9 bg-gray-200 animate-pulse rounded-full"></div>
          ) : user ? (
            <Button
              onClick={handleLogout}
              className="rounded-full px-5 py-2 text-sm md:text-base"
            >
              Logout
            </Button>
          ) : (
            <Button className="rounded-full px-5 py-2 text-sm md:text-base">
              <Link href="/login" className="block w-full text-center">
                Login
              </Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
