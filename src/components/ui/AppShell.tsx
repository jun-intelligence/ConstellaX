import Link from "next/link";
import type { ReactNode } from "react";
import { operatingNav } from "@/lib/intelligence";

export function AppShell({
  eyebrow,
  title,
  subtitle,
  children,
  action
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <main className="systemPage">
      <header className="systemHero reveal">
        <div>
          <p className="appleEyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {action}
      </header>
      {children}
    </main>
  );
}

export function TopNav() {
  return (
    <nav className="topNav" aria-label="Product navigation">
      <Link href="/operating-system">Operating System</Link>
      <div>
        {operatingNav.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
