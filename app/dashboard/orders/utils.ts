import prisma from "@/app/lib/db";

export async function getOrders() {
    const data = await prisma.order.findMany({
        select: {
            id: true,
            createdAt: true,
            status: true,
            amount: true,
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImage: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return data;
}