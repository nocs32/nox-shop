import { StarIcon } from "lucide-react";
import { ProductImageSlider } from "../../components/image-slider";
import { getProductById } from "../../utils";
import { FeaturedProducts } from "../../components/featured-products";
import { addProduct } from "@/app/actions";
import { AddProductButton } from "@/app/(store)/components/add-product-button";

export default async function ProductIdRoute({ params }: { params: { id: string } }) {
    const data = await getProductById(params.id);
    const addProductToCart = addProduct.bind(null, data.id);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
                <ProductImageSlider images={data.images} />
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">{data.name}</h1>
                    <p className="text-2xl mt-2 text-gray-900">${data.price}</p>
                    <div className="mt-3 flex items-center gap-1">
                        <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-base text-gray-700 mt-6">{data.description}</p>
                    <form action={addProductToCart}>
                        <AddProductButton />
                    </form>
                </div>
            </div>
            <div className="mt-16">
                <FeaturedProducts />
            </div>
        </>
    )
}