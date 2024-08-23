import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <section className="w-full min-h-[80vh] flex items-center justify-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
                    </div>
                    <div className="mt-3 text-center md:mt-5 w-full">
                        <h3 className="text-lg leading-6 font-med">Payment Successful</h3>
                        <p className="mt-2 text-muted-foreground text-sm">Your payment was successful. Thank you for your purchase.</p>
                        <Button className="w-full mt-5 md:mt-6">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </section>
    )
}