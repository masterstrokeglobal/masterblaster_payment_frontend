import Wallet from "./wallet";
import WithdrawDetailsRecord from "./withdrawl-details";

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
    platformFee?: number;
    profileImage?: string;
    isVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    platformFeePercentage?:number;
    wallet?:Wallet;
    withdrawDetails?:WithdrawDetailsRecord[]

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
        this.platformFee = params.platformFeePercentage;
        this.profileImage = params.profileImage;
        this.isVerified = params.isVerified;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.deletedAt = params.deletedAt;
        this.wallet = params.wallet ? new Wallet(params.wallet) : undefined;
        this.withdrawDetails = params.withdrawDetails ? params.withdrawDetails.map((item) => new WithdrawDetailsRecord(item)) : [];
    }

}

export default Merchant;
