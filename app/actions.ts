"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod"
import { bannerSchema, productSchema } from "./lib/zod-schemas";
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart } from "./types";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";

export async function createProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {schema: productSchema});

    if (submission.status !== "success") {
        return submission.reply();
    }

    const flattenUrls = submission.value.images.flatMap((url) => url.split(",").map(url => url.trim()));

    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status,
            price: submission.value.price,
            images: flattenUrls,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured === true ? true : false,
        }
    });

    redirect("/dashboard/products");
}

export async function editProduct(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== "sugoymail@gmail.com") {
        return redirect("/");
    }

    const submission = parseWithZod(formData, { schema: productSchema });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const productId = formData.get("productId") as string;
    const flattenUrls = submission.value.images.flatMap((url) => url.split(",").map(url => url.trim()));

    await prisma.product.update({
        where: { id: productId },
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status,
            price: submission.value.price,
            images: flattenUrls,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured === true ? true : false,
        }
    });

    redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== "sugoymail@gmail.com") {
        return redirect("/");
    }

    const productId = formData.get("productId") as string;

    await prisma.product.delete({
        where: { id: productId }
    });

    redirect("/dashboard/products");
}

export async function createBanner(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, { schema: bannerSchema });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.banner.create({
        data: {
            title: submission.value.title,
            imageString: submission.value.imageString,
        }
    });

    redirect("/dashboard/banners");
}

export async function deleteBanner(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user.email !== "sugoymail@gmail.com") {
        return redirect("/");
    }

    const bannerId = formData.get("bannerId") as string;

    await prisma.banner.delete({
        where: { id: bannerId }
    });

    redirect("/dashboard/banners");
}

export async function addProduct(id: string) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    let cart: Cart | null = await redis.get(`cart-${user.id}`);

    const selectedProduct = await prisma.product.findUnique({
        where: { id }
    });

    if (!selectedProduct) {
        throw new Error("Product not found");
    }

    let myCart = {} as Cart;

    if (!cart || !cart.items) {
        myCart = {
            userId: user.id,
            items: [
                {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    quantity: 1,
                    imageString: selectedProduct.images[0]
                }
            ]
        };
    } else {
        let itemFound = false;

        myCart.items = cart.items.map((item) => {
            if (item.id === id) {
                itemFound = true;
                item.quantity += 1;
            }

            return item;
        });

        if (!itemFound) {
            myCart.items.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity: 1,
                imageString: selectedProduct.images[0]
            });
        }
    }

    await redis.set(`cart-${user.id}`, myCart);

    revalidatePath("/", "layout")
}

export async function deleteCartProduct(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const productId = formData.get("productId") as string;
    let cart: Cart | null = await redis.get(`cart-${user.id}`);

    if (cart && cart.items) {
        const updatedCart: Cart = {
            userId: user.id,
            items: cart.items.filter((item) => item.id !== productId)
        };

        await redis.set(`cart-${user.id}`, updatedCart);
    }

    revalidatePath("/cart")
}

export async function checkout() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    let cart: Cart | null = await redis.get(`cart-${user.id}`);

    if (cart && cart.items) {
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item) => (
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.imageString]
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }
        ));

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: "http://localhost:3001/payment/success",
            cancel_url: "http://localhost:3001/payment/cancel",
            metadata: {
                userId: user.id
            }
        });

        return redirect(session.url as string);
    }
}