"use client";

import Link from "next/link";
import { links } from "../constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardNavigation() {
    const pathname = usePathname();

    return (
        <>
            {
                links.map((link, index) => (
                    <Link className={`text-lg ${cn(link.href === pathname ? 'text-primary' : 'text-muted-foreground')}`} key={index} href={link.href} > {link.name}</Link >
                ))
            }
        </>
    )
}