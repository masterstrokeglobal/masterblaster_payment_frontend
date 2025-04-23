"use client"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/context/auth-context";
import {
    useCreateMerchantQr,
    useGetAllMerchantQrs
} from '@/features/merchant-qr/api/merchant-qr-query';
import { QuickActions } from '@/features/merchant-qr/components/qr-actions';
import QRDetails from '@/features/merchant-qr/components/qr-details';
import { QRDisplay } from '@/features/merchant-qr/components/qr-display';
import { QRHeader } from '@/features/merchant-qr/components/qr-header';
import { Search, Loader2, RefreshCw } from 'lucide-react';
import React from 'react';

interface MerchantQr {
    id: string;
    name?: string;
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    createdAt: string;
    ifscCode?: string;
    isActive: boolean;
    upiId?: string;
}



const MerchantQRDashboard: React.FC = () => {
    const [selectedQRId, setSelectedQRId] = React.useState<string>('');
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const { userDetails } = useAuthStore();
    const {
        data: qrCodes,
        isLoading,
        refetch
    } = useGetAllMerchantQrs({ merchantId: userDetails?.id });


    // Keyboard shortcut for search focus
    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Filter QR codes
    const filteredQRCodes = React.useMemo(() => {
        if (!qrCodes?.data) return [];
        const searchString = searchQuery.toLowerCase();
        return qrCodes.data.filter((qr: MerchantQr) => {
            return (
                qr.name?.toLowerCase().includes(searchString) ||
                qr.accountName?.toLowerCase().includes(searchString) ||
                qr.bankName?.toLowerCase().includes(searchString) ||
                qr.accountNumber?.includes(searchString) ||
                qr.upiId?.toLowerCase().includes(searchString)
            );
        });
    }, [qrCodes?.data, searchQuery]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setTimeout(() => setIsRefreshing(false), 500);
    };



    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    // Get the selected QR code
    const selectedQR = qrCodes?.data?.find((qr: { id: string; }) => qr.id === selectedQRId);

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto p-8">
                <div className="flex justify-between items-center mb-6">
                    <QRHeader
                        title="Payment QR"
                        description="Manage and customize your payment QR codes"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 text-primary"
                    >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>

                <div className="mb-6 flex justify-between flex-wrap">
                    <div className="relative w-full md:w-[320px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search QR codes... (Ctrl + K)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full transition-all focus:ring-2 focus:ring-blue-500"
                        />
                        {searchQuery && (
                            <div className="bg-background absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                {filteredQRCodes.length} results
                            </div>
                        )}
                    </div>
                    <QuickActions />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* QR List */}
                    <div className="lg:col-span-1 space-y-2">
                        {filteredQRCodes.map((qr: MerchantQr) => (
                            <div
                                key={qr.id}
                                onClick={() => setSelectedQRId(qr.id)}
                                className={`bg-background p-4 rounded-lg border transition-all cursor-pointer hover:border-blue-500 ${selectedQRId === qr.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200'
                                    }`}
                            >
                                <div className="font-medium">
                                    {qr.upiId || `QR Code ${qr.id}`}
                                </div>
                                {qr.bankName && (
                                    <div className="text-sm text-gray-500">
                                        {qr.bankName}
                                    </div>
                                )}
                                <div className="text-xs text-gray-400">
                                    Created: {new Date(qr.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                        {filteredQRCodes.length === 0 && (
                            <div className="bg-background text-center p-4 text-gray-500 rounded-lg">
                                No matching QR codes found
                            </div>
                        )}
                    </div>

                    {/* QR Details */}
                    <div className="lg:col-span-2">
                        {selectedQR ? (<>
                            <QRDisplay qrCode={selectedQR} />
                            <div className="bg-background space-y-6">
                                <QRDetails merchantQR={selectedQR} />
                                <Alert className="border-2 bg-blue-50">
                                    <AlertDescription className="text-sm text-blue-800">
                                        Your QR code automatically updates with your latest merchant information. It's safe to share with customers.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        </>
                        ) : (
                            <div className="flex items-center justify-center h-full min-h-[400px] bg-background rounded-lg">
                                <div className="text-center text-gray-500">
                                    Select a QR code to view details
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MerchantQRDashboard;