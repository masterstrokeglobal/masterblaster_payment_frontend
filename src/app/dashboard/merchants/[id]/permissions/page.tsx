"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useGetMerchantById, useUpdateMerchant } from '@/features/merchant/api/merchant-query';
import { APIS } from '@/models/merchant';
import LoadingScreen from '@/components/common/loading-screen';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

// Define types for the merchant data
interface Wallet {
    balance: number;
}

interface MerchantData {
    id: number;
    name: string;
    email: string;
    isVerified: boolean;
    companyName?: string;
    companyGSTNumber?: string;
    companyAddress?: string;
    profileImage?: string;
    platformFeePercentage: number;
    wallet?: Wallet;
    restrictedApi: string[];
}

interface ApiResponse {
    data: MerchantData;
}

// Define the API mapping for human-readable labels
const API_LABELS: Record<string, string> = {
    [APIS.MERCHANT_QR]: "Merchant QR",
    [APIS.MERCHANT_PAYIN]: "Merchant Pay In",
    [APIS.MERCHANT_PAYOUT]: "Merchant Pay Out",
    [APIS.USER_WITHDRAW]: "User Withdraw",
    [APIS.USER_WITHDRAW_BULK]: "User Withdraw Bulk",
    [APIS.DEVELOPER_API]: "Developer API"
};

// Define descriptions for each API
const API_DESCRIPTIONS: Record<string, string> = {
    [APIS.MERCHANT_QR]: "Allow merchant to generate and manage QR codes for payments",
    [APIS.MERCHANT_PAYIN]: "Enable receiving payments from customers",
    [APIS.MERCHANT_PAYOUT]: "Enable sending payments to vendors or partners",
    [APIS.USER_WITHDRAW]: "Allow individual user withdrawals",
    [APIS.USER_WITHDRAW_BULK]: "Enable batch processing of multiple withdrawals at once",
    [APIS.DEVELOPER_API]: "Allow developers to integrate with the platform"
};

const MerchantDetails = (): JSX.Element => {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { isLoading, data, isSuccess } = useGetMerchantById(id.toString());

    // State for API restrictions only
    const [restrictedApis, setRestrictedApis] = useState<string[]>([]);

    // Update local state when merchant data is loaded
    useEffect(() => {
        if (isSuccess && data?.data) {
            setRestrictedApis(data.data.restrictedApi || []);
        }
    }, [isSuccess, data]);

    const updateMutation = useUpdateMerchant();

    // Toggle API restriction
    const toggleApiRestriction = (api: string): void => {
        setRestrictedApis(prev =>
            prev.includes(api)
                ? prev.filter(item => item !== api)
                : [...prev, api]
        );
    };

    // Handle form submission - only updates API restrictions
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        updateMutation.mutate({
            id: Number(id),
            restrictedApi: restrictedApis
        });
    };

    if (isLoading) {
        return <LoadingScreen className="min-h-screen" />;
    }

    const walletBalance = data?.data?.wallet?.balance || 0;
    const merchantName = data?.data?.name || 'Merchant';
    const isVerified = data?.data?.isVerified || false;
    const initials = merchantName.split(' ').map((n: any[]) => n[0]).join('').toUpperCase();

    return (
        <div className="container mx-auto py-6 px-4">
            {/* Merchant Profile Card */}
            <Card className="mb-6">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={data?.data?.profileImage || ''} alt={merchantName} />
                        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            {merchantName}
                            {isVerified ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                                <AlertCircle className="h-5 w-5 text-amber-500" />
                            )}
                        </CardTitle>
                        <CardDescription>{data?.data?.email}</CardDescription>
                        <Badge variant={isVerified ? "success" : "outline"} className="mt-1">
                            {isVerified ? "Verified" : "Unverified"}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Wallet Balance</p>
                            <p className="text-xl font-bold">₹{walletBalance.toLocaleString()}</p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Company Details</p>
                            <p className="font-medium">{data?.data?.companyName}</p>
                            {data?.data?.companyGSTNumber && (
                                <p className="text-sm">GST: {data.data.companyGSTNumber}</p>
                            )}
                        </div>

                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Platform Fee</p>
                            <p className="font-medium">{data?.data?.platformFeePercentage}%</p>
                        </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Address</p>
                        <p className="text-sm">{data?.data?.companyAddress || 'No address provided'}</p>
                    </div>
                </CardContent>
            </Card>

            {/* API Permissions */}
            <Card>
                <CardHeader>
                    <CardTitle>API Permissions</CardTitle>
                    <CardDescription>
                        Enable or disable specific API features for this merchant
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4 rounded-md border p-4">
                            {Object.values(APIS).map((api) => (
                                <div key={api} className="flex flex-col space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-base font-medium">
                                                {API_LABELS[api]}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {API_DESCRIPTIONS[api]}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium">
                                                {restrictedApis.includes(api) ? (
                                                    <Badge variant="destructive" className="flex gap-1 items-center">
                                                        <XCircle className="h-3 w-3" />
                                                        Restricted
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="flex gap-1 items-center bg-green-50">
                                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                        Allowed
                                                    </Badge>
                                                )}
                                            </span>
                                            <Switch
                                                id={`api-${api}`}
                                                checked={!restrictedApis.includes(api)}
                                                onCheckedChange={() => toggleApiRestriction(api)}
                                            />
                                        </div>
                                    </div>
                                    {api !== Object.values(APIS)[Object.values(APIS).length - 1] && (
                                        <Separator className="my-2" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={updateMutation.isPending}
                            >
                                {updateMutation.isPending ? "Updating..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default MerchantDetails;