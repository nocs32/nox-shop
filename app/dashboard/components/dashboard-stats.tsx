import prisma from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PackageSearch, ShoppingBag, Users } from "lucide-react";

async function getData() {
    const [users, products, orders] = await Promise.all([
        await prisma.user.findMany({
            select: {
                id: true
            }
        }),
        await prisma.product.findMany({
            select: {
                id: true
            }
        }),
        await prisma.order.findMany({
            select: {
                amount: true
            }
        })
    ]);

    return {
        users: users,
        products: products,
        orders: orders
    };
}

export async function DashboardStats() {
    const { users, products, orders } = await getData();
    const totalOrderAmount = orders.reduce((acc, order) => acc + order.amount, 0) / 100;

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle>Total Revenue</CardTitle>
                    <DollarSign className="text-primary" size={24} />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">${new Intl.NumberFormat("en-US").format(totalOrderAmount)}</p>
                    <p className="text-sx text-muted-foreground">Based on 100 charges</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle>Total Sales</CardTitle>
                    <ShoppingBag className="text-primary" size={24} />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">+{orders.length}</p>
                    <p className="text-sx text-muted-foreground">Total Sales on NOX SHOP</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle>Total Products</CardTitle>
                    <PackageSearch className="text-primary" size={24} />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{products.length}</p>
                    <p className="text-sx text-muted-foreground">Total Products Created</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle>Total Users</CardTitle>
                    <Users className="text-primary" size={24} />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{users.length}</p>
                    <p className="text-sx text-muted-foreground">Total Users Signed Up</p>
                </CardContent>
            </Card>
        </div>
    )
}