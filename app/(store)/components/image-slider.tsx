"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductImageSliderProps {
    images: string[];
}

export function ProductImageSlider({ images }: ProductImageSliderProps) {
    const [currentImage, setCurrentImage] = useState(0);

    const handlePrev = () => setCurrentImage((prev: number) => prev === 0 ? images.length - 1 : prev - 1);
    const handleNext = () => setCurrentImage((prev: number) => prev === images.length - 1 ? 0 : prev + 1);
    const handleTileClick = (index: number) => setCurrentImage(index);

    return (
        <div className="grid gap-6 md:gap-3 items-start">
            <div className="relative overflow-hidden rounded-lg">
                <Image className="object-cover w-[600px] h-[440px]" src={images[currentImage]} alt="Product image" width={600} height={440} />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <Button variant="secondary" size="icon" onClick={handlePrev}>
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={handleNext}>
                        <ChevronRight className="w-6 h-6" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 justify-center">
                {images.map((image, index) => (
                    <div key={index} className={`${currentImage === index ? "border-2 border-red-500" : "border border-gray-200"} relative overflow-hidden rounded-xl`}>
                        <Image
                            className={`cursor-pointer hover:opacity-100 transition-all duration-400 object-cover w-[100px] h-[100px] ${currentImage === index ? "opacity-100" : "opacity-70"}`}
                            src={image} alt="Product image"
                            width={100}
                            height={100}
                            onClick={() => handleTileClick(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}