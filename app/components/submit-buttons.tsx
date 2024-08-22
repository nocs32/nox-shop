"use client";

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

interface SubmitButtonProps {
    title: string
}

export function SubmitButton({ title }: SubmitButtonProps) {
    const { pending } = useFormStatus()

    if (pending) {
        return (
            <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait...
            </Button>
        )
    }

    return <Button type="submit">{title}</Button>
}