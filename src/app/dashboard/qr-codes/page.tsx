"use client";

import React from 'react';
import { Download, Copy, QrCode, RefreshCw, Share2, Info } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

const MerchantQRDashboard = () => {
    const [copied, setCopied] = React.useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText("https://6tv9r7zrsn.ufs.sh/f/HbaQF5z7YpECLiujhVrWnGXFy1BAJxMf6ZYijTmbouzcgEDa");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto p-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-1">
                        <QrCode className="w-6 h-6 text-blue-600" />
                        <h1 className="text-3xl font-bold tracking-tight">Payment QR</h1>
                    </div>
                    <p className="text-gray-500">Manage and customize your payment QR codes</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main QR Display */}
                    <Card className="lg:col-span-2 border-2">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>Active QR Code</CardTitle>
                                    <CardDescription>Last updated: Today at 10:30 AM</CardDescription>
                                </div>
                                <Badge variant="outline" className="border-green-500 text-green-600">
                                    Active
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl border-2 border-gray-100 p-8">
                                <div className="flex justify-center">
                                    <div className="relative group bg-white p-6 rounded-lg shadow-sm">
                                        <img
                                            src="https://6tv9r7zrsn.ufs.sh/f/HbaQF5z7YpECLiujhVrWnGXFy1BAJxMf6ZYijTmbouzcgEDa"
                                            alt="Merchant QR Code"
                                            className="w-64 h-64 object-contain"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-4">
                            <Button variant="outline" onClick={() => window.open("https://6tv9r7zrsn.ufs.sh/f/HbaQF5z7YpECLiujhVrWnGXFy1BAJxMf6ZYijTmbouzcgEDa", "_blank")}>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                            </Button>
                            <Button variant="outline" onClick={handleCopyLink}>
                                <Share2 className="w-4 h-4 mr-2" />
                                {copied ? 'Copied!' : 'Share'}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Side Panel */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full" size="lg">
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Generate New QR
                                </Button>
                                <Button variant="outline" className="w-full" size="lg">
                                    <Info className="w-4 h-4 mr-2" />
                                    View Transactions
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Details Card */}
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle className="text-lg">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-gray-500">Merchant ID</span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="font-mono text-sm">
                                                    MERCH123456
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Your unique merchant identifier</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-gray-500">Type</span>
                                        <span className="text-sm">Dynamic QR</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-gray-500">Created</span>
                                        <span className="text-sm">Jan 16, 2025</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Alert className="border-2 bg-blue-50">
                            <AlertDescription className="text-sm text-blue-800">
                                Your QR code automatically updates with your latest merchant information. It's safe to share with customers.
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MerchantQRDashboard;