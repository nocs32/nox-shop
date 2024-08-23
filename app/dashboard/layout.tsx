import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardNavigation } from "./components/dashboard-navigation";
import { Button } from "@/components/ui/button";
import { CircleUser, LogOut, MenuIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <header className="sticky top-0 flex h-16 items-center justify-between border-b gap-4 bg-white">
                <div className="flex items-center">
                    <Link href="/">
                        <h1 className="text-black font-bold text-xl lg:text-3xl">
                            <span className="text-red-500">NOX</span>SHOP
                        </h1>
                    </Link>
                </div>
                <nav className="hidden font-medium md:flex md:items-center md:gap-5 md:text-sm lg:gap-6 mx-auto">
                    <DashboardNavigation />
                </nav >
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="shrink-0 md:hidden" variant="outline" size="icon">
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="flex flex-col gap-6 text-lg font-medium mt-5">
                            <DashboardNavigation />
                        </nav>
                    </SheetContent>
                </Sheet>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="rounded-full" variant="secondary" size="icon">
                            <CircleUser className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <LogoutLink>
                                <div className="cursor-pointer flex items-center justify-between w-full">
                                    Log Out <LogOut size={20} />
                                </div>
                            </LogoutLink>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <main className="my-5">
                {children}
            </main>
        </div>
    )
}