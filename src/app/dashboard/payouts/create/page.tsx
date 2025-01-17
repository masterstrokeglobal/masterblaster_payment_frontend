"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import PayoutRequestForm from '@/features/payout/create/payout-form';

// You would typically get this from an API
const mockMerchantData = {
  id: 1,
  walletBalance: 25000,
  name: "John's Store"
};

const PayoutRequestPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handlePayoutSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Here you would make your API call to submit the payout request
      // await submitPayoutRequest(data);
      
      console.log('Submitting payout request:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Payout request submitted successfully");

      // Redirect back to dashboard after successful submission
      router.push('/merchants/dashboard');
    } catch (error) {
        toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/merchants/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Request Payout</h1>
            </div>
            <div className="text-sm text-gray-500">
              ID: {mockMerchantData.id}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Side - Form */}
            <div className="md:col-span-2">
              <PayoutRequestForm
                onSubmit={handlePayoutSubmit}
                isLoading={isSubmitting}
                walletBalance={mockMerchantData.walletBalance}
              />
            </div>

            {/* Right Side - Info Cards */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payout Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Processing Time</h3>
                    <p className="text-sm text-gray-500">Bank transfers typically take 2-3 business days</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Minimum Amount</h3>
                    <p className="text-sm text-gray-500">Minimum payout amount is $100</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Maximum Amount</h3>
                    <p className="text-sm text-gray-500">Maximum payout amount is $10,000 per transaction</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    If you have any questions about payouts, please contact our support team.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutRequestPage;