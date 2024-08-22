import Link from "next/link";
import all from '@/public/all-cat.webp';
import men from '@/public/men-cat.jpg';
import women from '@/public/women-cat.jpg';
import Image from "next/image";

export function CategoriesSelection() {
    return (
        <div className="py-8 md:py-12">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-extrabold tracking-tight">Shop by Category</h2>
                <Link className="text-sm font-semibold text-red-500 hover:text-primary/80" href="/products">Browse All Products &rarr;</Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gal-y-6 md:grid-cols-2 md:grid-rows-2 md:gap-x-6 lg:gap-8">
                <div className="group aspect-w-2 aspect-h-1 rounded-xl overflow-hidden md:aspect-w-1 md:row-span-2">
                    <Image className="object-cover object-center" src={all} alt="All Categories Image" />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-50" />
                    <div className="p-6 flex items-end">
                        <Link href="/products/all">
                            <h3 className="text-white font-semibold">All Products</h3>
                            <p className="mt-1 text-sm text-white">Shop Now</p>
                        </Link>
                    </div>
                </div>
                <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden md:relative ld:aspect-none md:h-full">
                    <Image className="object-cover object-center md:absolute md:inset-0 md:w-full md:h-full" src={men} alt="Men Category Image" />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-50" />
                    <div className="p-6 flex items-end">
                        <Link href="/products/all">
                            <h3 className="text-white font-semibold">Men's Hats</h3>
                            <p className="mt-1 text-sm text-white">Shop Now</p>
                        </Link>
                    </div>
                </div>
                <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden md:relative ld:aspect-none md:h-full">
                    <Image className="object-cover object-center md:absolute md:inset-0 md:w-full md:h-full" src={women} alt="Women Category Image" />
                    <div className="bg-gradient-to-b from-transparent to-black opacity-50" />
                    <div className="p-6 flex items-end">
                        <Link href="/products/all">
                            <h3 className="text-white font-semibold">Women's hats</h3>
                            <p className="mt-1 text-sm text-white">Shop Now</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}