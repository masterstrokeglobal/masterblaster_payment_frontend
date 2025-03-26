"use client";
import CreateMerchantDocumentForm from "@/features/merchant/create-merchant-document-form";
import { useParams } from "next/navigation";

const MerchantDocumentPage = () => {
    const { id } = useParams<{ id: string }>();
    return <CreateMerchantDocumentForm merchantId={id} />
};

export default MerchantDocumentPage;   
