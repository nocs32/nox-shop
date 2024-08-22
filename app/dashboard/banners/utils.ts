import prisma from "@/app/lib/db";

export async function getBanners() {
    const data = await prisma.banner.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return data;
}