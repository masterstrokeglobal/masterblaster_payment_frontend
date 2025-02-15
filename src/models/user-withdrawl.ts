export enum WithdrawalStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
}


export enum WithdrawalType {
    RTGS = "RTGS",
    NEFT = "NEFT",
    IMPS = "IMPS",
    UPI = "UPI",
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

export class UserWithdrawal {
    id!: number;
    merchant?: Merchant;
    accountName!: string;
    accountNumber!: string;
    ifscCode!: string;
    bankName!: string;
    status!: WithdrawalStatus;
    type!: WithdrawalType;
    amount!: number;
    userName!: string;
    userEmail!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    constructor(data: Partial<UserWithdrawal>) {
        Object.assign(this, data);
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
    }

    updateStatus(newStatus: WithdrawalStatus) {
        this.status = newStatus;
        this.updatedAt = new Date();
    }
}
