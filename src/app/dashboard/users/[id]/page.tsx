"use client";

import LoadingScreen from "@/components/common/loading-screen";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/context/auth-context";
import TransactionTable from "@/features/transaction/transaction-table";
import { useGetUserById } from "@/features/user/data/user-queries";
import Admin, { AdminRole } from "@/models/admin";
import { useParams } from "next/navigation";

const ViewUserPage = () => {
    const params = useParams();
    const { id } = params;
    const { isLoading } = useGetUserById(id!.toString());
    const { userDetails: currentUser } = useAuthStore();

    const user = currentUser as Admin;

    if (isLoading) return <LoadingScreen className="h-[60vh]">Loading user...</LoadingScreen>; // Show loading screen if loading

    return (
        <section className="container-main min-h-[60vh]">
            <header className="flex flex-col md:flex-row gap-4 flex-wrap md:items-center justify-between">
                <h2 className="text-xl font-semibold">User Details</h2>
            </header>
            <Separator className="mt-4" />
            {user?.role != AdminRole.AGENT && <main className="mt-4">
                <TransactionTable userId={id!.toString()} />
            </main>}
        </section>
    );
};

export default ViewUserPage;
