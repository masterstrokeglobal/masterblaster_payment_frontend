import { AdminRole } from "./admin";
import Wallet from "./wallet";
import WithdrawDetailsRecord from "./withdrawl-details";

export enum APIS {
    MERCHANT_QR = "merchant_qr",
    MERCHANT_PAYIN = "merchant_payin",
    MERCHANT_PAYOUT = "merchant_payout",
    USER_WITHDRAW = "user_withdraw",
    USER_WITHDRAW_BULK = "user_withdraw_bulk",
    DEVELOPER_API = "developer_api",
}

class Merchant {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    password?: string;
    companyName?: string;
    companyAddress?: string;
    companyGSTNumber?: string;
    companyPanNumber?: string;
    companyCINNumber?: string;
    platformFee?: number;
    profileImage?: string;
    role?: AdminRole;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    restrictedApi?: APIS[];
    deletedAt?: Date;
    platformFeePercentage?: number;
    wallet?: Wallet;
    withdrawDetails?: WithdrawDetailsRecord[]

    constructor(params: Partial<Merchant> = {}) {
        this.id = params.id;
        this.name = params.name;
        this.username = params.username;
        this.email = params.email;
        this.phone = params.phone;
        this.password = params.password;
        this.companyName = params.companyName;
        this.companyAddress = params.companyAddress;
        this.companyGSTNumber = params.companyGSTNumber;
        this.companyPanNumber = params.companyPanNumber;
        this.companyCINNumber = params.companyCINNumber;
        this.platformFee = params.platformFeePercentage;
        this.profileImage = params.profileImage;
        this.isVerified = params.isVerified;
        this.role = params.role;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.deletedAt = params.deletedAt;
        this.restrictedApi = params.restrictedApi;
        this.platformFeePercentage = params.platformFeePercentage;
        this.wallet = params.wallet ? new Wallet(params.wallet) : undefined;
        this.withdrawDetails = params.withdrawDetails ? params.withdrawDetails.map((item) => new WithdrawDetailsRecord(item)) : [];
    }

    get isSuperAdmin() {
        return this.role === AdminRole.SUPER_ADMIN;
    }

    get isMerchant() {
        return this.role === AdminRole.Merchant;
    }

    hasAccessTo(api: APIS) {
        return !this.restrictedApi?.includes(api);
    }

    isRestricted(api: APIS) {
        return this.restrictedApi?.includes(api);
    }

}

export default Merchant;
