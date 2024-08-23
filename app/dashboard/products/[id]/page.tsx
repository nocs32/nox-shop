import { EditForm } from "../../components/edit-form";
import { getProductById } from "../utils"
import { unstable_noStore as noStore } from "next/cache";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    noStore();
    const data = await getProductById(params.id);

    return <EditForm data={data} />
}