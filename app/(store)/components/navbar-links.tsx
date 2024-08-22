"use client";

import Link from "next/link";
import { navbarLinks } from "../constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavbarLinks() {
    const location = usePathname();

    return (
        <div className="hidden text-lg md:flex justify-center items-center gap-x-3 mx-auto">
            {navbarLinks.map((link) => (
                <Link className={cn(location === link.href ? 'bg-red-100' : 'hover:bg-red-100 hover:bg-opacity-75', "group p-2 font-medium rounded-md")} key={link.id} href={link.href}>{link.name}</Link>
            ))}
        </div>
    )
}