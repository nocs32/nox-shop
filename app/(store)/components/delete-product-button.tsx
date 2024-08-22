"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function DeleteProductButton() {
    const { pending } = useFormStatus();

    if (pending) {
        return (
            <Button className="font-medium text-red-500 text-end" variant="outline" disabled><Trash2 className="mr-2" size={20} />Removing...</Button>
        )
    }

    return (
        <Button className="font-medium text-red-500 text-end" variant="outline"><Trash2 className="mr-2" size={20} type="submit" />Remove</Button>
    )
}