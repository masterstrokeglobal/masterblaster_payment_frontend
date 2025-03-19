import Merchant from "./merchant";



export default class Surcharge {
    id: number | null;
    merchant?: Merchant;
    startRange: number;
    endRange: number;
    surcharge: number;
    flat: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(params: Partial<Surcharge> = {}) {
        this.id = params.id ?? null;
        this.merchant = params.merchant;
        this.startRange = params.startRange ?? 0;
        this.endRange = params.endRange ?? 0;
        this.surcharge = params.surcharge ?? 0;
        this.flat = params.flat ?? false;
        this.createdAt = params.createdAt ?? new Date();
        this.updatedAt = params.updatedAt ?? new Date();
        this.deletedAt = params.deletedAt ?? null;
    }
}
