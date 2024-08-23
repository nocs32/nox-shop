import { checkout, deleteCartProduct } from "@/app/actions";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/types";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { DeleteProductButton } from "../components/delete-product-button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { CheckoutButton } from "../components/checkout-button";
import { unstable_noStore as noStore } from "next/cache";

export default async function CartPage() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`);
    let totalPrice = 0;
    cart?.items.forEach((item) => totalPrice += item.price * item.quantity);

    return (
        <div className="max-w-2xl mt-10 mx-auto min-h-[55vh]">
            {
                !cart || cart?.items.length === 0 ?
                    (
                        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                                <ShoppingBag className="w-10 h-10 text-red-500" />
                            </div>
                            <h2 className="font-xl mt-6 font-semibold">Your cart is empty</h2>
                            <div className="flex flex-col mt-2 items-center">
                                <p className="text-sm leading-6 text-muted-foreground max-w-sm">Looks like you haven&apos;t added anything to your cart yet.</p>
                                <Button className="text-white bg-red-500 mt-4" asChild>
                                    <Link href="/">Start shopping</Link>
                                </Button>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="flex flex-col gap-y-10">
                            {cart?.items.map((item) => (
                                <div className="flex border rounded-md p-4" key={item.id}>
                                    <div className="w-28 h-24 sm:w-36 sm:h-32 relative">
                                        <Image className="rounded-md object-cover" src={item.imageString} alt="Product Image" fill />
                                    </div>
                                    <div className="ml-5 flex justify-between w-full font-medium">
                                        <p className="font-medium text-lg">{item.name}</p>
                                        <div className="flex flex-col h-full justify-between items-end">
                                            <div className="flex items-center gap-x-2">
                                                <p>{item.quantity}x</p>
                                                <p className="font-medium text-xl">${item.price}</p>
                                            </div>
                                            <form action={deleteCartProduct}>
                                                <input type="hidden" name="productId" value={item.id} />
                                                <DeleteProductButton />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-10 px-2">
                                <div className="flex items-center justify-between font-medium">
                                    <p>Subtotal:</p>
                                    <p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
                                </div>
                                <form action={checkout}>
                                    <CheckoutButton />
                                </form>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}