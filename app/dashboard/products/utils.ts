import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

export async function getProducts() {
    const data = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return data;
}

export async function getProductById(id: string) {
    const data = await prisma.product.findUnique({
        where: {
            id
        }
    });

    if (!data) {
        return notFound();
    }

    return data;
}