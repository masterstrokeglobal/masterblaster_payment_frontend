"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useGetMerchantById } from "@/features/merchant/api/merchant-query";
import Script from "next/script";

// Define proper TypeScript interfaces
interface PaymentTransaction {
  statusCode?: string;
}

interface PaymentMethod {
  paymentTransaction?: PaymentTransaction;
}

interface PaymentResponse {
  paymentMethod?: PaymentMethod;
}

interface Merchant {
  name: string;
  logoUrl?: string;
  qrCode?: string;
  paynimoMerchantId?: string;
}

// Declare window interface properly
declare global {
  interface Window {
    $: {
      pnCheckout: (config: any) => void;
    };
  }
}

const PaymentPage = () => {
  const { id: merchantId } = useParams();
  const [paymentState, setPaymentState] = useState({
    isSuccess: false,
    isPending: false,
    error: null as string | null,
  });
  const [scriptsState, setScriptsState] = useState({
    jquery: false,
    paynimo: false,
  });

  console.log("scripted", scriptsState);

  const { data: merchantData, error: merchantError } = useGetMerchantById(
    merchantId?.toString() || ""
  );

  const merchant = merchantData?.data as Merchant | undefined;

  // Compute overall scripts loaded state
  const isScriptsLoaded = scriptsState.jquery && scriptsState.paynimo;

  // Reset success state after delay
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (paymentState.isSuccess) {
      timeoutId = setTimeout(() => {
        setPaymentState(prev => ({ ...prev, isSuccess: false }));
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [paymentState.isSuccess]);

  const handlePaynimoResponse = (res: PaymentResponse) => {
    setPaymentState(prev => ({ ...prev, isPending: false }));

    const statusCode = res?.paymentMethod?.paymentTransaction?.statusCode;

    switch (statusCode) {
      case "0300":
        setPaymentState(prev => ({ ...prev, isSuccess: true, error: null }));
        break;
      case "0398":
        console.log("Payment initiated");
        break;
      default:
        setPaymentState(prev => ({
          ...prev,
          error: "Payment failed. Please try again.",
        }));
        console.error("Payment failed", res);
    }
  };

  const handlePaymentClick = () => {
    if (!isScriptsLoaded || !window.$) {
      setPaymentState(prev => ({
        ...prev,
        error: "Payment gateway not loaded. Please refresh the page.",
      }));
      return;
    }

    setPaymentState(prev => ({ ...prev, isPending: true, error: null }));

    const txnId = `TXN_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    const paymentConfig = {
      "features": {
          "enableAbortResponse": true,
          "enableExpressPay": true,
          "enableInstrumentDeRegistration" : true,
          "enableMerTxnDetails": true
      },
      "consumerData": {
          "deviceId": "WEBSH2",   
          "token": "e04be9ed85f134a8ca30f609dca6c1f36e742762590daf6ed6edda06275f378a2147f6244ca2295d134beba1e98c6e67140577893b99e6bd34c09d3f2350519c",
          "returnUrl": "https://pgproxyuat.in.worldline-solutions.com/linuxsimulator/MerchantResponsePage.jsp",    //merchant response page URL
          "responseHandler": handlePaynimoResponse,
          "paymentMode": "all",
          "merchantLogoUrl": "https://www.paynimo.com/CompanyDocs/company-logo-vertical.png",  //provided merchant logo will be displayed
          "merchantId": "L3348",
          "currency": "INR",
          "consumerId": "c964634",
          "txnId": "1708068696283",   //Unique merchant transaction ID
          "items": [{
              "itemId": "first",
              "amount": "1",
              "comAmt": "0"
          }],
          "customStyle": {
              "PRIMARY_COLOR_CODE": "#45beaa",   //merchant primary color code
              "SECONDARY_COLOR_CODE": "#FFFFFF",   //provide merchant's suitable color code
              "BUTTON_COLOR_CODE_1": "#2d8c8c",   //merchant's button background color code
              "BUTTON_COLOR_CODE_2": "#FFFFFF"   //provide merchant's suitable color code for button text
          }
      }
  };

    try {
      window.$.pnCheckout(paymentConfig);
    } catch (error) {
      setPaymentState(prev => ({
        ...prev,
        isPending: false,
        error: "Failed to initialize payment. Please try again.",
      }));
    }
  };

  if (merchantError) {
    return (
      <div className="p-4 text-center text-red-600">
        Failed to load merchant details. Please try again later.
      </div>
    );
  }

  return (
    <section className="p-4 flex justify-center items-center min-h-screen bg-gray-50">
      <Script
        src="https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js"
        onLoad={() => setScriptsState(prev => ({ ...prev, jquery: true }))}
        strategy="afterInteractive"
      />

      <Script
        src="https://www.paynimo.com/paynimocheckout/server/lib/checkout.js"
        onLoad={() => setScriptsState(prev => ({ ...prev, paynimo: true }))}
        strategy="afterInteractive"
      />

      <Card className="w-full max-w-md relative overflow-hidden">
        <div
          className={`transition-opacity duration-500 ${paymentState.isSuccess ? "opacity-0" : "opacity-100"
            }`}
        >
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">Payment Details</h2>
            {merchant?.name && (
              <p className="text-center text-gray-500">
                Merchant Name: {merchant.name}
              </p>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {merchant?.qrCode && (
              <div className="flex justify-center p-4 bg-white rounded-lg border">
                <img
                  src={merchant.qrCode}
                  alt="Payment QR Code"
                  className="w-full h-auto"
                />
              </div>
            )}

            {paymentState.error && (
              <div className="text-red-600 text-sm text-center">
                {paymentState.error}
              </div>
            )}

            <Button
              onClick={handlePaymentClick}
              className={`relative w-full h-11 transition-all duration-300
                ${paymentState.isSuccess ? "bg-green-500 hover:bg-green-600" : ""}
                ${paymentState.isPending ? "cursor-not-allowed opacity-80" : ""}
              `}
              disabled={paymentState.isPending || paymentState.isSuccess || !isScriptsLoaded}
            >
              <span
                className={`flex items-center justify-center gap-2 transition-opacity duration-300 
                  ${paymentState.isPending || paymentState.isSuccess ? "opacity-0" : "opacity-100"}`}
              >
                {isScriptsLoaded ? "Proceed to Pay" : "Loading Payment Gateway..."}
              </span>

              {paymentState.isPending && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </span>
              )}

              {paymentState.isSuccess && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </span>
              )}
            </Button>
          </CardContent>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center bg-white/95 transition-opacity duration-500
            ${paymentState.isSuccess ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-green-600">
              Payment Successful!
            </h3>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default PaymentPage;