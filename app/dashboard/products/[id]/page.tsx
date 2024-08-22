import { EditForm } from "../../components/edit-form";
import { getProductById } from "../utils"

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const data = await getProductById(params.id);

    return <EditForm data={data} />
}