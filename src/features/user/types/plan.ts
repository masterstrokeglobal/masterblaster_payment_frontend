export interface PlanFeature {
    text: string;
    enabled: boolean;
}

export enum BillingCycle {
    Monthly = 'monthly',
    Annual = 'annual'
}
export interface Plan {
    name: string;
    monthlyPrice: number;
    annualPrice: number;
    features: PlanFeature[];
    billingCycle: BillingCycle;
    popular?: boolean;
}
