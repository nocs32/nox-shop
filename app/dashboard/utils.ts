import prisma from "../lib/db";

export async function getChartData() {
    const data = await prisma.order.findMany({
        select: {
            amount: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'asc'
        },
        where: {
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7))
            }
        }
    });

    const result = data.map((order) => ({
        revenue: order.amount / 100,
        date: new Intl.DateTimeFormat("en-US").format(order.createdAt)
    }));

    return result;
}

export function AggregateChartData(data: any) {
    const aggregated = data.reduce((acc: any, curr: any) => {
        if (acc[curr.date]) {
            acc[curr.date] += curr.revenue;
        } else {
            acc[curr.date] = curr.revenue;
        }

        return acc;
    });

    return Object.keys(aggregated).map((date) => ({
        date,
        revenue: aggregated[date]
    }));
}