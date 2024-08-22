"use client";

import { createBanner } from "@/app/actions";
import { SubmitButton } from "@/app/components/submit-buttons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zod-schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function CreateBannerPage() {
    const [image, setImages] = useState<string | undefined>(undefined);
    const [lastResult, action] = useFormState(createBanner, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: bannerSchema });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <div className="flex items-center gap-x-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/banners">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Banner Details</CardTitle>
                    <CardDescription>Fill in the details of the new banner</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter the name of the banner"
                                name={fields.title.name}
                                key={fields.title.key}
                                defaultValue={fields.title.initialValue}
                            />
                            <p className="text-red-500">{fields.title.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Image</Label>
                            <input type="hidden" key={fields.imageString.key} value={image} name={fields.imageString.name} defaultValue={fields.imageString.initialValue} />
                            {image !== undefined ?
                                (
                                    <div className="relative w-[100px] h-[100px]">
                                        <Image className="w-full h-full object-cover rounded-lg border" height={100} width={100} src={image} alt="Product Image" />
                                        <button
                                            className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-md"
                                            type="button"
                                            onClick={() => setImages(undefined)}
                                        >
                                            <XIcon className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        <p className="text-sm text-muted-foreground">Please make sure to press Upload and wait for the upload process to finish before submitting the form</p>
                                        <UploadDropzone onClientUploadComplete={res => setImages(res[0].url)} endpoint="bannerImageRoute" onUploadError={() => alert("Something went wrong")} />
                                    </>
                                )
                            }
                            <p className="text-red-500">{fields.imageString.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton title="Create Banner" />
                </CardFooter>
            </Card >
        </form >
    )
}