import { CategoriesSelection } from "./components/categories";
import { FeaturedProducts } from "./components/featured-products";
import { Hero } from "./components/hero";

export default function HomePage() {
    return (
        <div>
            <Hero />
            <CategoriesSelection />
            <FeaturedProducts />
        </div>
    )
}