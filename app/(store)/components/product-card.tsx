import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    item: {
        id: string;
        name: string;
        description: string;
        price: number;
        images: string[];
    }
}

export function ProductCard({ item }: ProductCardProps) {
    return (
        <div className="rounded-xl">
            <Carousel className="w-full mx-auto">
                <CarouselContent>
                    {item.images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-[300px]">
                                <Image className="object-cover object-center w-full h-full rounded-xl" src={image} alt="Product Image" fill />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-16" />
                <CarouselNext className="mr-16" />
            </Carousel>
            <div className="flex justify-between items-center mt-2 px-1">
                <h1 className="font-semibold text-xl">{item.name}</h1>
                <h3 className="inline-flex items-center rounded-md px-2 py-1 text-md font-medium text-primary ring-1 ring-inset ring-primary/10">${item.price}</h3>
            </div>
            <p className="text-gray-500 text-sm mt-2 px-1 line-clamp-2">{item.description}</p>
            <Button className="w-full mt-5 bg-red-500" asChild>
                <Link href={`/product/${item.id}`}>Product Page</Link>
            </Button>
        </div>
    )
}