import { Suspense } from "react";
import { getFeaturedProducts } from "../utils"
import { ProductCard } from "./product-card";
import { LoadingProductCard } from "./loading-product-card";
import { unstable_noStore as noStore } from "next/cache";

export function FeaturedProducts() {
    return (
        <>
            <h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
            <Suspense fallback={<LoadingRows />}>
                <LoadFeaturedProducts />
            </Suspense>
        </>
    )
}

async function LoadFeaturedProducts() {
    noStore();
    const data = await getFeaturedProducts();

    return (
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((product) => (
                <ProductCard key={product.id} item={product} />
            ))}
        </div>
    )
}

function LoadingRows() {
    return (
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <LoadingProductCard />
            <LoadingProductCard />
            <LoadingProductCard />
        </div>
    )
}