import { deleteBanner } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DeleteBannerPage({ params }: { params: { id: string } }) {
    return (
        <div className="h-[80vh] w-full flex items-center justify-center">
            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle className="text-center">Are you sure you want to delete this banner?</CardTitle>
                    <CardDescription className="text-center pt-1">This action cannot be undone. This will permanently delete the banner from your store.</CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button asChild>
                        <Link href="/dashboard/banners">Cancel</Link>
                    </Button>
                    <form action={deleteBanner}>
                        <input type="hidden" name="bannerId" value={params.id} />
                        <Button variant="destructive">Delete Banner</Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}