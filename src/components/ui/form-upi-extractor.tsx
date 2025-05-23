"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { toast } from "sonner";
import { BrowserQRCodeReader } from "@zxing/browser";

interface FormQrUpiExtractorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  className?: string;
  inputClassName?: string;
  accept?: string;
}

const FormQrUpiExtractor = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  className,
  inputClassName,
  accept = "image/*",
}: FormQrUpiExtractorProps<TFieldValues, TName>) => {
  const { setValue, watch } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fieldValue = watch(name);

  useEffect(() => {
    if (!fieldValue) {
      setPreviewUrl(null);
    }
  }, [fieldValue]);

  useEffect(() => {
    if (fieldValue && typeof fieldValue === 'object' && 'imageUrl' in fieldValue) {
      setPreviewUrl(fieldValue.imageUrl);
    }
  }, [fieldValue]);

  const extractUpiFromQrData = (qrData: string) => {
    const upiRegex = /pa=([a-zA-Z0-9.-]+@[a-zA-Z][a-zA-Z]{2,64})/i;
    const match = qrData.match(upiRegex);
    return match?.[1] || null;
  };

  const extractUpiFromQr = async (imageFile: File) => {
    setIsProcessing(true);
    try {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);

      const codeReader = new BrowserQRCodeReader();
      const img = document.createElement("img");
      img.src = url;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const result = await codeReader.decodeFromImageElement(img);

      if (result && result.getText()) {
        const qrText = result.getText();
        const upiId = extractUpiFromQrData(qrText);

        if (upiId) {
          setValue(name, upiId as unknown as TFieldValues[TName]);
          toast.success(`UPI ID extracted: ${upiId}`);
        } else {
          toast.warning("No UPI ID found in this QR code");
          setValue(name, "" as unknown as TFieldValues[TName]);
        }
      } else {
        toast.error("No QR code detected in image");
        setValue(name, "" as unknown as TFieldValues[TName]);
      }
    } catch (error) {
      console.error("Error processing QR code:", error);
      toast.error("Failed to process QR code");
      setValue(name, "" as unknown as TFieldValues[TName]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = useCallback(() => {
    setPreviewUrl(null);
    setValue(name, "" as unknown as TFieldValues[TName]);
    toast.info("Image removed");
  }, [setValue, name]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              {previewUrl ? (
                <div className="relative bg-gray-100 rounded-xl pr-12">
                  <img
                    src={previewUrl}
                    alt="QR Preview"
                    width={160}
                    height={160}
                    className="w-auto h-40 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={18} />
                  </button>
                  {fieldValue && typeof fieldValue === 'object' && 'upiId' in fieldValue && (
                    <div className="absolute bottom-2 left-2 right-10 bg-black bg-opacity-70 text-white p-2 rounded">
                      <p className="text-sm font-medium truncate">
                        UPI: {fieldValue.upiId}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`
                    border-2 border-dashed bg-background
                    border-[#E2E2E2] rounded-lg p-6 
                    cursor-pointer hover:border-gray-400 
                    transition-colors ${inputClassName}
                  `}
                  onClick={() =>
                    document.getElementById(`file-${name}`)?.click()
                  }
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Image
                      width={32}
                      height={32}
                      alt="file"
                      src="/images/file.svg"
                      className="w-8 h-8 text-primary"
                    />
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <span>Reading QR code...</span>
                      </div>
                    ) : (
                      <div className="flex text-sm text-primary">
                        <p className="relative">
                          Drop a UPI QR code here or{' '}
                          <span className="text-blue-600 hover:underline">
                            browse
                          </span>{' '}
                          to extract UPI ID
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <input
                id={`file-${name}`}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    extractUpiFromQr(file);
                    onChange(file);
                  }
                }}
                accept={accept}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormQrUpiExtractor;
