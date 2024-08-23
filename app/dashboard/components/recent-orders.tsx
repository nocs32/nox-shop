import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getData() {
    const data = await prisma.order.findMany({
        select: {
            user: {
                select: {
                    email: true,
                    firstName: true,
                    lastName: true,
                    profileImage: true
                }
            },
            amount: true,
            id: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 6
    });

    return data;
}

export async function RecentOrders() {
    const data = await getData();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                {data.map((order) => (
                    <div key={order.id} className="flex items-center gap-4">
                        <Avatar className="hidden sm:flex h-10 w-10">
                            <AvatarImage src={order.user.profileImage} alt="Profile Image" />
                            <AvatarFallback>{order.user.firstName[0] + order.user.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="grid">
                            <p className="text-sm font-medium">{order.user.firstName + " " + order.user.lastName}</p>
                            <p className="text-sm text-muted-foreground">{order.user.email}</p>
                        </div>
                        <p className="ml-auto font-medium">+${new Intl.NumberFormat("en-US").format(order.amount / 100)}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}