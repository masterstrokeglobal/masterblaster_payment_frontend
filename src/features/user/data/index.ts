import { BillingCycle, Plan, PlanFeature } from "../types/plan";

const introFeatures: PlanFeature[] = [
    { text: 'Upload videos with a resolution of up to 720p for clear playback', enabled: true },
    { text: 'Enjoy limited storage space with a capacity of 5GB for your content', enabled: true },
    { text: 'Access basic analytics to track your content performance', enabled: true },
    { text: 'Get assistance with standard email support for your queries', enabled: true },
    { text: 'Enhance your brand with custom branding options (not included)', enabled: false }
];

const proFeatures: PlanFeature[] = [
    { text: 'Upload videos with a resolution of up to 1080p for full HD quality', enabled: true },
    { text: 'Enjoy unlimited storage capacity for all your content needs', enabled: true },
    { text: 'Gain insights with advanced analytics to optimize your strategy', enabled: true },
    { text: 'Benefit from priority email support for faster query resolutions', enabled: true },
    { text: 'Enhance your business identity with custom branding options (not included)', enabled: false }
];

const enterpriseFeatures: PlanFeature[] = [
    { text: 'Upload videos with ultra-high definition up to 4K resolution for premium quality', enabled: true },
    { text: 'Store unlimited amounts of content with no storage restrictions', enabled: true },
    { text: 'Leverage comprehensive analytics to make data-driven decisions', enabled: true },
    { text: 'Access 24/7 dedicated support for any immediate assistance', enabled: true },
    { text: 'Secure your content with enterprise-grade security measures', enabled: true },
    { text: 'Use your own custom domain to reinforce your professional branding', enabled: true }
];

export const plans: Plan[] = [
    {
        name: 'Intro',
        monthlyPrice: 123,
        annualPrice: 1476, // 123 * 12
        features: introFeatures,
        billingCycle: BillingCycle.Monthly,
        popular: false
    },
    {
        name: 'Pro',
        monthlyPrice: 323,
        annualPrice: 3876, // 323 * 12
        features: proFeatures,
        billingCycle: BillingCycle.Monthly,
        popular: true
    },
    {
        name: 'Enterprise',
        monthlyPrice: 1203,
        annualPrice: 14436, // 1203 * 12
        features: enterpriseFeatures,
        billingCycle: BillingCycle.Monthly,
        popular: false
    }
];

export default plans;