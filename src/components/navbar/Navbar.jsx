"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/products", label: "Products", icon: "▣" },
  { href: "/profile", label: "Profile", icon: "◔" },
  { href: "/cart", label: "Cart", icon: "🛒" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="topbar-shell">
      <nav className="topbar" aria-label="Main navigation">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "nav-link active" : "nav-link"}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
