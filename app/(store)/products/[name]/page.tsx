import { ProductCard } from "../../components/product-card";
import { getProducts } from "../../utils";

export default async function CategoriesPage({ params }: { params: { name: string } }) {
    const { data, title } = await getProducts(params.name);

    return (
        <section>
            <h1 className="font-semibold text-3xl my-5">{title}</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.map((product) => (
                    <ProductCard key={product.id} item={product} />
                ))}
            </div>
        </section>
    )
}