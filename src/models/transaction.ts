export enum TransactionType {
    DEPOSIT = "deposit",
    WITHDRAWAL = "withdraw",
  }
  
  export enum TransactionStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
  }
  
  export type Merchant = {
    id: number;
    name: string;
    email: string;
    role: string;
    companyName: string;
    companyAddress: string;
    companyGSTNumber: string | null;
    platformFeePercentage: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
  
  export class Transaction {
    id!: number;
    pgId?: string;
    type!: TransactionType;
    amount!: number;
    status!: TransactionStatus;
    platformFeePercentage!: number;
    platformFeeAmount!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;
    merchant!: Merchant;
    payerName!: string;
  
    constructor(data: Partial<Transaction>) {
      Object.assign(this, data);
    }
  }
  