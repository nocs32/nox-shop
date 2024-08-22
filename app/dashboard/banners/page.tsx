import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, SquarePlus, Trash2, User2 } from "lucide-react";
import Link from "next/link";
import { getBanners } from "./utils";
import Image from "next/image";

export default async function BannerPage() {
    const data = await getBanners();

    return (
        <>
            <div className="flex items-center justify-end">
                <Button className="flex gap-x-2" asChild>
                    <Link href="/dashboard/banners/create">
                        <SquarePlus className="w-5 h-5" />
                        <span className="text-md">Create Banner</span>
                    </Link>
                </Button>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banners</CardTitle>
                    <CardDescription>Manage your banners</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((banner) => (
                                <TableRow key={banner.id}>
                                    <TableCell>
                                        <Image className="rounded-lg object-cover h-16 w-16" src={banner.imageString} alt="Banner Image" width={64} height={64} />
                                    </TableCell>
                                    <TableCell className="font-medium">{banner.title}</TableCell>
                                    <TableCell className="text-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="cursor-pointer flex items-center justify-between" asChild>
                                                    <Link href={`/dashboard/banners/${banner.id}/delete`}>
                                                        Delete <Trash2 size={14} />
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}