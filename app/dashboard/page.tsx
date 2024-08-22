import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PackageSearch, ShoppingBag, Users } from "lucide-react";

export default function Dashboard() {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle>Total Revenue</CardTitle>
                        <DollarSign className="text-primary" size={24} />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">$100.000</p>
                        <p className="text-sx text-muted-foreground">Based on 100 charges</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle>Total Sales</CardTitle>
                        <ShoppingBag className="text-primary" size={24} />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">+50</p>
                        <p className="text-sx text-muted-foreground">Total Sales on NOX SHOP</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle>Total Products</CardTitle>
                        <PackageSearch className="text-primary" size={24} />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">37</p>
                        <p className="text-sx text-muted-foreground">Total Products Created</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle>Total Users</CardTitle>
                        <Users className="text-primary" size={24} />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">77</p>
                        <p className="text-sx text-muted-foreground">Total Users Signed Up</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>Recent transactions from your store</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-10 w-10">
                                <AvatarFallback>TN</AvatarFallback>
                            </Avatar>
                            <div className="grid">
                                <p className="text-sm font-medium">Tim Nox</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$10,999.00</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-10 w-10">
                                <AvatarFallback>TN</AvatarFallback>
                            </Avatar>
                            <div className="grid">
                                <p className="text-sm font-medium">Tim Nox</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$10,999.00</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-10 w-10">
                                <AvatarFallback>TN</AvatarFallback>
                            </Avatar>
                            <div className="grid">
                                <p className="text-sm font-medium">Tim Nox</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$10,999.00</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-10 w-10">
                                <AvatarFallback>TN</AvatarFallback>
                            </Avatar>
                            <div className="grid">
                                <p className="text-sm font-medium">Tim Nox</p>
                                <p className="text-sm text-muted-foreground">test@test.com</p>
                            </div>
                            <p className="ml-auto font-medium">+$10,999.00</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}