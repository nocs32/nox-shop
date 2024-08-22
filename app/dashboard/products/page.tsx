import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Pencil, SquarePlus, Trash2, UserIcon } from "lucide-react";
import Link from "next/link";
import { getProducts } from "./utils";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/app/utils";

export default async function ProductsPage() {
    const data = await getProducts();

    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex items-center gap-x-2">
                    <Link href="/dashboard/products/create">
                        <SquarePlus className="w-5 h-5" />
                        <span className="text-md">Add Product</span>
                    </Link>
                </Button>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your products and view their sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Created Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Image className="rounded-md object-cover h-16 w-16" alt="Product Image" src={item.images[0]} height={60} width={60} />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{capitalizeFirstLetter(item.status)}</TableCell>
                                    <TableCell>${item.price}</TableCell>
                                    <TableCell>{new Intl.DateTimeFormat("en-US").format(item.createdAt)}</TableCell>
                                    <TableCell>
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
                                                    <Link href={`/dashboard/products/${item.id}`}>
                                                        Edit <Pencil size={14} />
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer flex items-center justify-between" asChild>
                                                    <Link href={`/dashboard/products/${item.id}/delete`}>
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