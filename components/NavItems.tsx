'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
    { label: "Accueil", href: "/"},
    { label: "Companions", href: "/companion"},
    { label: "Mon Profil", href: "/profil"},
]

const NavItems = () => {

    const pathname = usePathname();

    return (
        <div className="flex items-center gap-4">
            { navItems.map(({ label, href }) => (
                <Link href={href} key={label} className={cn( pathname === href && "text-primary font-bold")}>
                    {label}
                </Link>
            ))}
        </div>
    )
}

export default NavItems;