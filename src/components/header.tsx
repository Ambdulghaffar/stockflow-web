"use client";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { ROUTES } from "@/constants/route";
import { UserMenu } from "./dashboard/user-menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/products", label: "Produits" },
    { href: "/categories", label: "Catégories" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Électro-Chic
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-md font-medium text-gray-600 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex">
            <Search className="h-5 w-5 text-gray-600" />
          </div>
          <ShoppingCart className="h-5 w-5 text-gray-600 cursor-pointer" />

          {session ? (
            <UserMenu variant="compact" showDashboardLink={true} />
          ) : (
            <div className="hidden items-center space-x-2 md:flex">
              <Button
                asChild
                variant="ghost"
                className="text-black border rounded-xl border-gray-300"
              >
                <Link href={ROUTES.LOGIN}>Se connecter</Link>
              </Button>
              <Button asChild className="border rounded-xl ">
                <Link href={ROUTES.REGISTER}>S&apos;inscrire</Link>
              </Button>
            </div>
          )}

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t bg-white md:hidden">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t pt-4">
              {!session && (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="outline">
                    <Link href={ROUTES.LOGIN}>Se connecter</Link>
                  </Button>
                  <Button asChild>
                    <Link href={ROUTES.REGISTER}>S&apos;inscrire</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
