"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";

export function AddProductButton() {
    const { pending } = useFormStatus();

    if (pending) {
        return (
            <Button className="w-full mt-5" size="lg" disabled>
                <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Adding to Cart...
            </Button>
        )
    }

    return (
        <Button className="w-full mt-5" size="lg" type="submit">
            <ShoppingBag className="mr-4 h-5 w-5" /> Add to Cart
        </Button>
    )
}