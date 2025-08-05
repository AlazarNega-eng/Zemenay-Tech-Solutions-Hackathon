import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { BoltIcon } from "@heroicons/react/24/solid";

export function Header() {
  return (
    <header className="py-4 border-b border-border">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors"
        >
          <BoltIcon className="h-6 w-6 text-blue-500" />
          Zemenay Blog
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
} 