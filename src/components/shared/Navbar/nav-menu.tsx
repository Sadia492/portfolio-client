"use client";

import { useAuth } from "@/actions/useAuth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export const NavMenu = (props: NavigationMenuProps) => {
  const { user, isLoading } = useAuth();
  console.log("NavMenu user:", user); // Debug log

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start font-medium">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/projects"
              className="hover:text-primary transition-colors"
            >
              Projects
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/blogs"
              className="hover:text-primary transition-colors"
            >
              Blogs
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Show dashboard link only when user is logged in */}
        {user && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/dashboard/blogs"
                className="hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
