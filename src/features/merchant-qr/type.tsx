// types/merchant-qr.ts
import { z } from "zod";

// Base interface for Merchant QR
export interface MerchantQr {
  id: number;
  accountName: string;
  accountNumber: string;
  qrCode: string;
  bankName: string;
  upiId: string;
  ifscCode: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  qrLimit?: string
  mobileIp?: string;
  batteryPercentage?: string;
}

// Type for creating a new Merchant QR
export type CreateMerchantQrDto = Omit<
  MerchantQr,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

// Type for updating a Merchant QR
export type UpdateMerchantQrDto = Partial<CreateMerchantQrDto>;

// Response type from the API
export interface MerchantQrResponse {
  data: MerchantQr[];
  total: number;
  page: number;
  limit: number;
}

// Zod schema for form validation
export const merchantQrFormSchema = z.object({
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  bankName: z.string().optional(),
  upiId: z.string().min(1, "UPI ID is required"),
  ifscCode: z.string().optional(),
  qrLimit: z.string(),
  isActive: z.boolean().default(true).optional(),
});

// Infer the form type from the schema
export type MerchantQrFormValues = z.infer<typeof merchantQrFormSchema>;
