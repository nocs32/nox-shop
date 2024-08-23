import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getBannersData } from "../utils";
import Image from "next/image";

export async function Hero() {
    const data = await getBannersData();

    return (
        <Carousel>
            <CarouselContent>
                {data.map((item, index) => (
                    <CarouselItem key={index}>
                        <div className="relative h-[60vh]">
                            <Image className="object-cover w-full h-full rounded-xl" src={item.imageString} alt="Banner Image" fill />
                            <div className="absolute bottom-6 left-6 bg-opacity-75 bg-black text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
                                <h1 className="text-xl lg:text-4xl font-semibold">{item.title.toUpperCase()}</h1>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
        </Carousel>
    )
}