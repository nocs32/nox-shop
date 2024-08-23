import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "./components/dashboard-stats";
import { RecentOrders } from "./components/recent-orders";
import { Chart } from "./components/chart";
import { getChartData } from "./utils";

export default async function Dashboard() {
    const data = await getChartData();

    return (
        <>
            <DashboardStats />
            <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>Recent transactions from last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Chart data={data} />
                    </CardContent>
                </Card>
                <RecentOrders />
            </div>
        </>
    )
}