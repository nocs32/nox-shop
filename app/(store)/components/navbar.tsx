import Link from "next/link";
import { NavbarLinks } from "./navbar-links";
import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./user-dropdown";
import { Button } from "@/components/ui/button";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/types";

export async function Navbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const cart: Cart | null = await redis.get(`cart-${user?.id}`);
    const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    return (
        <nav className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center">
                <Link href="/">
                    <h1 className="text-black font-bold text-xl lg:text-3xl">
                        <span className="text-red-500">NOX</span>SHOP
                    </h1>
                </Link>
            </div>
            <NavbarLinks />
            <div className="flex items-center">
                {
                    user ?
                        (
                            <>
                                <Link className="group p-2 flex items-center mr-3" href="/cart">
                                    <div className="relative">
                                        <ShoppingBagIcon className="h-6 w-6 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-700 border w-5 h-5 flex items-center justify-center rounded-lg absolute bg-white z-1 -top-2.5 -right-2.5">{total}</span>
                                    </div>
                                </Link>
                                <UserDropdown email={user.email as string} firstName={user.given_name as string} lastName={user.family_name as string} userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`} />
                            </>
                        )
                        :
                        (
                            <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
                                <Button asChild variant="outline">
                                    <LoginLink>Log In</LoginLink>
                                </Button>
                                <span className="h-6 w-px bg-gray-200"></span>
                                <Button className="bg-red-500" asChild>
                                    <RegisterLink>Sign Up</RegisterLink>
                                </Button>
                            </div>
                        )
                }
            </div>
        </nav>
    )
}