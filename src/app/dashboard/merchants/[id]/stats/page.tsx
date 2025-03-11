"use client"

import MerchantDashboard from "@/components/common/merchant-dashboard"
import { useParams } from "next/navigation"

export default function Dashboard() {
    const merchantId = useParams().id as string;
    return <MerchantDashboard merchantId={merchantId} />
}
