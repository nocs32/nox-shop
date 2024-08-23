import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrders } from "./utils";
import { capitalizeFirstLetter } from "@/app/utils";

export default async function OrdersPage() {
    const data = await getOrders();

    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>Recent orders from your store</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <p className="font-medium">{order.user.firstName + " " + order.user.lastName}</p>
                                    <p className="hidden md:flex text-sm text-muted-foreground">{order.user.email}</p>
                                </TableCell>
                                <TableCell>Order</TableCell>
                                <TableCell>{capitalizeFirstLetter(order.status)}</TableCell>
                                <TableCell>{new Intl.DateTimeFormat('en-US').format(order.createdAt)}</TableCell>
                                <TableCell>${new Intl.NumberFormat("en-US").format(order.amount / 100)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}