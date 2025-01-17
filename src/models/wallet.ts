class Wallet {
    id?: number;
    merchant?: any;  // Reference to Merchant model
    amount?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    constructor(params: Partial<Wallet> = {}) {
        this.id = params.id;
        this.merchant = params.merchant;
        this.amount = params.amount;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.deletedAt = params.deletedAt;
    }

    // Helper method to validate amount
    validate(): boolean {
        if (this.amount !== undefined && this.amount < 0) {
            throw new Error("Amount cannot be negative");
        }
        if (this.amount !== undefined && typeof this.amount !== 'number') {
            throw new Error("Amount must be a number");
        }
        return true;
    }

    // Helper method to format amount to 2 decimal places
    getFormattedAmount(): string {
        return this.amount !== undefined 
            ? this.amount.toFixed(2) 
            : '0.00';
    }
}

export default Wallet;