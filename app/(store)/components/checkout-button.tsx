"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function CheckoutButton() {
    const { pending } = useFormStatus();

    if (pending) {
        return (
            <Button className="w-full mt-5" disabled size="lg">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />Please wait...
            </Button>
        )
    }

    return (
        <Button className="w-full mt-5" size="lg" type="submit">Checkout</Button>
    )
}