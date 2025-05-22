"use client";

import {
  Download,
  PlusCircle,
  Share2,
  Trash,
  StopCircle,
  PlayCircle,
} from "lucide-react";
import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MerchantQr, MerchantQrFormValues } from "../type";
import QRCode from "./custom-qr-code";
import {
  useDeleteMerchantQr,
  useUpdateMerchantQr,
} from "../api/merchant-qr-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRGenerateForm } from "./qr-generate-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStartAutomation } from "@/features/merchant-qr/api/merchant-qr-query";
import { useStopAutomation } from "@/features/merchant-qr/api/merchant-qr-query";

interface QRDisplayProps {
  qrCode: MerchantQr;
}

export const QRDisplay = ({ qrCode }: QRDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const qrCodeRef = useRef(null);
  const { mutateAsync: deleteQr, isPending: isDeleting } =
    useDeleteMerchantQr();

  const handleCopyLink = () => {
    if (qrCode?.upiId) {
      navigator.clipboard.writeText(qrCode.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!qrCode?.qrCode || !qrCodeRef.current) return;

    // Create a canvas from the QR code element
    const qrElement = qrCodeRef.current;

    // Use html2canvas (you'll need to install this package)
    import("html2canvas").then((html2canvas) => {
      html2canvas.default(qrElement).then((canvas) => {
        // Convert canvas to image data URL
        const imageData = canvas.toDataURL("image/png");

        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = imageData;
        downloadLink.download = `qrcode_${qrCode.upiId || "merchant"}.png`;

        // Trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    });
  };

  const startAutomationMutation = useStartAutomation();
  const stopAutomationMutation = useStopAutomation();

  const handleStartAutomation = async () => {
    if (!qrCode?.mobileIp) {
      return;
    }

    try {
      // Trigger the mutation with the mobileIp string
      await startAutomationMutation.mutateAsync(qrCode.mobileIp);
    } catch (error) {
      console.error("Failed to start automation:", error);
      //   throw new Error("Failed to start automation : " + error);
    }
  };

  const handleStopAutomation = async () => {
    if (!qrCode?.mobileIp) {
      return;
    }

    try {
      // Trigger the mutation with the mobileIp string
      await stopAutomationMutation.mutateAsync(qrCode.mobileIp);
    } catch (error) {
      console.error("Failed to stop automation:", error);
      return;
    }
  };

  const formattedDate = qrCode?.updatedAt
    ? format(new Date(qrCode.updatedAt), "PPP p")
    : "N/A";

  const batteryPercentage = qrCode?.batteryPercentage
    ? qrCode.batteryPercentage
    : "";

  return (
    <Card className="lg:col-span-2 bg-background mb-4">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{qrCode?.upiId || "Active QR Code"}</CardTitle>
            <CardDescription>Last updated: {formattedDate}</CardDescription>
            <CardDescription> {batteryPercentage}</CardDescription>
          </div>
          {qrCode?.isActive ? (
            <Badge
              variant="outline"
              className="border-green-500 text-green-600"
            >
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="border-red-500 text-red-600">
              Inactive
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="bg-bakcground rounded-xl p-8">
          <div className="flex justify-center">
            <div
              ref={qrCodeRef}
              className="relative group bg-white p-6 rounded-lg shadow-sm"
            >
              {qrCode?.upiId ? (
                <QRCode merchantQr={qrCode} />
              ) : (
                <div className="w-64 h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <p className="text-gray-500">No QR Code Available</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all rounded-lg" />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-4">
        <UpdateQrMerchant qrCode={qrCode} />
        <Button
          variant="outline"
          onClick={() => deleteQr(qrCode.id.toString())}
          disabled={isDeleting}
          className="text-primary"
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={handleDownload}
          disabled={!qrCode?.qrCode}
          className="text-primary"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button
          variant="outline"
          onClick={handleCopyLink}
          disabled={!qrCode?.upiId}
          className="text-primary"
        >
          <Share2 className="w-4 h-4 mr-2" />
          {copied ? "Copied!" : "Share"}
        </Button>
      </CardFooter>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={handleStartAutomation}
          disabled={!qrCode?.mobileIp}
          className="text-primary"
        >
          <PlayCircle className="w-4 h-4 mr-2" />
          Start Automation
        </Button>
        <Button
          variant="outline"
          onClick={handleStopAutomation}
          disabled={!qrCode?.mobileIp}
          className="text-primary"
        >
          <StopCircle className="w-4 h-4 mr-2" />
          Stop Automation
        </Button>
      </CardFooter>
    </Card>
  );
};

type Props = {
  qrCode: MerchantQr;
};

export const UpdateQrMerchant = ({ qrCode }: Props) => {
  const createMutation = useUpdateMerchantQr();

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const handleGenerateNewQR = async (
    values: MerchantQrFormValues
  ): Promise<void> => {
    try {
      const updatedValues = {
        ...values,
        qrLimit: Number(values.qrLimit), // Convert qrLimit to number
        balanceQrLimit: Number(values.qrLimit), // Convert balanceQrLimit to number
      };
      await createMutation.mutateAsync({
        qrId: qrCode.id.toString(),
        data: updatedValues,
      });
    } catch (error) {
      console.error("Error generating QR:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
          Update QR
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose ref={closeButtonRef} />
        <ScrollArea className="h-[80vh]">
          <QRGenerateForm
            onSubmit={handleGenerateNewQR}
            isGenerating={createMutation.isPending}
            defaultValues={qrCode}
            title="Update QR Code"
            description="Update the details of your QR code"
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
