import { notFound } from "next/navigation";
import prisma from "../lib/db";

export async function getBannersData() {
    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return data;
}

export async function getFeaturedProducts() {
    const data = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            images: true
        },
        where: {
            status: "published",
            isFeatured: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return data;
}

export async function getProductById(id: string) {
    const data = await prisma.product.findUnique({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            images: true
        },
        where: {
            id
        }
    })

    if (!data) {
        return notFound();
    }

    return data;
}

export async function getProducts(category: string) {
    switch (category) {
        case "all":
            const data = await prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    images: true
                },
                where: {
                    status: "published"
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            return {
                title: "All Products",
                data
            }
        case "men":
            const menData = await prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    images: true
                },
                where: {
                    status: "published",
                    category: "men"
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            return {
                title: "Men's Products",
                data: menData
            }
        case "women":
            const womenData = await prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    images: true
                },
                where: {
                    status: "published",
                    category: "women"
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            return {
                title: "Women's Products",
                data: womenData
            }
        case "kids":
            const kidsData = await prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    images: true
                },
                where: {
                    status: "published",
                    category: "kids"
                },
                orderBy: {
                    createdAt: "desc"
                }
            });

            return {
                title: "Kids Products",
                data: kidsData
            }
        default:
            return notFound();
    }
}