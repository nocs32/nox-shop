import { deleteProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DeleteRoute({ params }: { params: { id: string } }) {
    return (
        <div className="h-[80vh] w-full flex items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle className="text-center">Are you sure you want to delete this product?</CardTitle>
                    <CardDescription className="text-center pt-1">This action cannot be undone. This will permanently delete the product from your store.</CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button asChild>
                        <Link href="/dashboard/products">Cancel</Link>
                    </Button>
                    <form action={deleteProduct}>
                        <input type="hidden" name="productId" value={params.id} />
                        <Button variant="destructive">Delete Product</Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}