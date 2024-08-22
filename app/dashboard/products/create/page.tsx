"use client";

import { createProduct } from "@/app/actions";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeftIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zod-schemas";
import { useState } from "react";
import Image from "next/image";
import { SubmitButton } from "@/app/components/submit-buttons";

export default function CreateProductPage() {
    const [images, setImages] = useState<string[]>([]);
    const [lastResult, action] = useFormState(createProduct, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: productSchema });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    })

    const handleImageDelete = (index: number) => setImages(images.filter((_, i) => i !== index))

    return (
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/products">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
            </div>
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Fill out the fields to create a new product</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>Name</Label>
                            <Input
                                className="w-full"
                                type="text"
                                placeholder="Product Name"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={fields.name.initialValue}
                            />
                            <p className="text-red-500">{fields.name.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Description</Label>
                            <Textarea
                                className="w-full"
                                placeholder="Write your product description..."
                                key={fields.description.key}
                                name={fields.description.name}
                                defaultValue={fields.description.initialValue}
                            />
                            <p className="text-red-500">{fields.description.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Price</Label>
                            <Input
                                className="w-full"
                                type="number"
                                placeholder="$999,99.00"
                                key={fields.price.key}
                                name={fields.price.name}
                                defaultValue={fields.price.initialValue}
                            />
                            <p className="text-red-500">{fields.price.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Featured Product</Label>
                            <Switch
                                key={fields.isFeatured.key}
                                name={fields.isFeatured.name}
                                defaultValue={fields.isFeatured.initialValue}
                            />
                            <p className="text-red-500">{fields.isFeatured.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Status</Label>
                            <Select
                                key={fields.status.key}
                                name={fields.status.name}
                                defaultValue={fields.status.initialValue}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.status.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Category</Label>
                            <Select
                                key={fields.category.key}
                                name={fields.category.name}
                                defaultValue={fields.category.initialValue}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="men">Men</SelectItem>
                                    <SelectItem value="women">Women</SelectItem>
                                    <SelectItem value="kids">Kids</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-red-500">{fields.category.errors}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>Images</Label>
                            <input
                                type="hidden"
                                key={fields.images.key}
                                defaultValue={fields.images.initialValue as any}
                                name={fields.images.name}
                                value={images}
                            />
                            {
                                images.length > 0 ?
                                    (
                                        <div className="flex gap-5">
                                            {images.map((image, index) => (
                                                <div key={index} className="relative w-[100px] h-[100px]">
                                                    <Image className="w-full h-full object-cover rounded-lg border" height={100} width={100} src={image} alt="Product Image" />
                                                    <button
                                                        className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-md"
                                                        type="button"
                                                        onClick={() => handleImageDelete(index)}
                                                    >
                                                        <XIcon className="w-4 h-4 text-white" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                    :
                                    (
                                        <>
                                            <p className="text-sm text-muted-foreground">Please make sure to press Upload and wait for the upload process to finish before submitting the form</p>
                                            <UploadDropzone
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => setImages(res.map((image) => image.url))}
                                                onUploadError={() => alert('Something went wrong')}
                                            />
                                        </>
                                    )
                            }
                            <p className="text-red-500">{fields.images.errors}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton title="Create Product" />
                </CardFooter>
            </Card>
        </form>
    )
}