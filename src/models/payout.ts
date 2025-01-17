// Payout model
class Payout {
    id?: number;
    username?: string;
    amount?: number;
    bank?: string;
    accountNumber?: string;
    status?: string; // Pending, Completed, Failed, etc.
    walletBalance?: number;
    createdAt?: Date;

    constructor(params: Partial<Payout> = {}) {
        this.id = params.id;
        this.username = params.username;
        this.amount = params.amount;
        this.bank = params.bank;
        this.accountNumber = params.accountNumber;
        this.status = params.status;
        this.walletBalance = params.walletBalance;
        this.createdAt = params.createdAt;
    }
}

export default Payout;