import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoadingFallback() {
    return (
        <div className="grid md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
            <div>
                <Skeleton className="h-[600px] w-full" />
                <div className="flex flex-row items-center gap-4 justify-center">
                    <Skeleton className="h-[100px] w-[100px]" />
                    <Skeleton className="h-[100px] w-[100px]" />
                    <Skeleton className="h-[100px] w-[100px]" />
                    <Skeleton className="h-[100px] w-[100px]" />
                    <Skeleton className="h-[100px] w-[100px]" />
                </div>
            </div>
            <div>
                <Skeleton className="h-12 w-56" />
                <Skeleton className="h-12 w-36 mt-4" />
                <Skeleton className="h-60 w-full mt-4" />
                <Skeleton className="h-12 w-full mt-5" />
            </div>
        </div>
    )
}