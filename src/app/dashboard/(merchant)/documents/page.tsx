"use client";
import { useAuthStore } from "@/context/auth-context";
import CreateMerchantDocumentForm from "@/features/merchant/create-merchant-document-form";

const MerchantDocumentPage = () => {

    const { userDetails } = useAuthStore();
    const merchantId = userDetails?.id;

    if (!merchantId) {
        return null
    }
    return (
        <CreateMerchantDocumentForm merchantId={merchantId.toString()} />
    );
};

export default MerchantDocumentPage;   
