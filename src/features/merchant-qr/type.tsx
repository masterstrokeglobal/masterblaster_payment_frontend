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
  qrLimit?: number
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
  accountName: z.string().min(1, "Account name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  bankName: z.string().min(1, "Bank name is required"),
  upiId: z.string().min(1, "UPI ID is required"),
  ifscCode: z.string().min(1, "IFSC code is required"),
  qrLimit: z.string(),
  isActive: z.boolean().default(true),
});

// Infer the form type from the schema
export type MerchantQrFormValues = z.infer<typeof merchantQrFormSchema>;
