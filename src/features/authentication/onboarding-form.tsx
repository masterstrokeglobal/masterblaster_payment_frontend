"use client";

import Logo from "@/components/common/logo";
import FormInput from "@/components/form/form-input";
import FormProvider from "@/components/form/form-provider";
import FormSelect from "@/components/form/form-select";
import { Button } from "@/components/ui/button";
import { StepperProvider, useStepper } from "@/context/use-stepper-context";
import { pronounOptions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRegisterUser } from "./query/user";

// Separate schemas for each step
const step1Schema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

const step2Schema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    profession: z.string().min(2, "Profession must be at least 2 characters"),
});

const step3Schema = z.object({
    country: z.string().min(2, "Country must be at least 2 characters"),
    pronouns: z.string().min(2, "Pronouns must be at least 2 characters"),
});

// Combined schema for final submission
const onboardingSchema = z.object({
    ...step1Schema.shape,
    ...step2Schema.shape,
    ...step3Schema.shape,
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;


const StepContent = ({ step, control }: { step: number; control: any }) => {
    return (
        <div className="space-y-4">
            {step === 0 && (
                <>
                    <FormInput
                        control={control}
                        name="firstName"
                        placeholder="First Name"
                        label="First Name"
                    />
                    <FormInput
                        control={control}
                        name="lastName"
                        placeholder="Last Name"
                        label="Last Name"
                    />
                </>
            )}

            {step === 1 && (
                <>
                    <FormInput
                        control={control}
                        name="title"
                        placeholder="Title"
                        label="Title"
                    />
                    <FormInput
                        control={control}
                        name="profession"
                        placeholder="Profession"
                        label="Profession"
                    />
                </>
            )}

            {step === 2 && (
                <>
                    <FormInput
                        control={control}
                        name="country"
                        placeholder="Country"
                        label="Country"
                    />
                    <FormSelect
                        control={control}
                        options={pronounOptions}
                        label="Pronouns"
                        name="pronouns"
                        placeholder="Preferred Pronouns"
                    />
                </>
            )}
        </div>
    );
};

export const OnboardingFlowForm = () => {
    const { mutate, isPending } = useRegisterUser();
    const router = useRouter();
    const { currentStep, nextStep, prevStep } = useStepper();

    const form = useForm<OnboardingFormValues>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            title: "",
            profession: "",
            country: "",
            pronouns: "",
        },
        mode: "onChange",
        context: { currentStep },
    });

    const isLastStep = currentStep === 2;
    const isFirstStep = currentStep === 0;

    const handleSubmit = async (data: OnboardingFormValues) => {
        if (isLastStep) {
            mutate(
                {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    title: data.title,
                    profession: data.profession,
                    country: data.country,
                    pronouns: data.pronouns,
                },
                {
                    onSuccess: () => {
                        toast.success("Profile setup completed successfully");
                        router.push("/dashboard/overview");
                    },
                    onError: (error) => {
                        toast.error(error.response?.data?.details ?? "An error occurred");
                    },
                }
            );
        } else {
            nextStep();
        }
    };

    const handleNext = () => {
        nextStep();
    };

    const title = "Complete Your Profile";
    const descriptions = [
        "Let's start with your basic information.",
        "Tell us about your professional background.",
        "Just a few more details to go.",
    ];

    return (
        <div className="w-full space-y-9 max-w-md">
            <div className="flex justify-center rounded-full overflow-hidden w-full mt-4">
                {[0, 1, 2].map((step) => (
                    <div
                        key={step}
                        className={`h-2 flex-1 ${step <= currentStep ? "bg-blue-600" : "bg-gray-200"
                            }`}
                    />
                ))}
            </div>

            <header className="space-y-2.5">
                <figure className="mx-auto w-fit mb-1.5">
                    <Logo className="h-14" />
                </figure>
                <h1 className="text-black-sub-heading text-3xl font-bold text-center">
                    {title}
                </h1>
                <p className="text-black-caption text-center">
                    {descriptions[currentStep]}
                </p>
            </header>

            <FormProvider methods={form} onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="space-y-4">
                    <StepContent step={currentStep} control={form.control} />

                    <div className="flex gap-4">
                        {!isFirstStep && (
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={prevStep}
                            >
                                Back
                            </Button>
                        )}
                        {isLastStep && (
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isPending}
                            >
                                Complete Setup
                            </Button>
                        )}

                        {!isLastStep && (
                            <Button
                                type="button"
                                onClick={handleNext}
                                className="flex-1"
                                disabled={isPending}
                            >
                                Continue
                            </Button>
                        )}
                    </div>
                </div>
            </FormProvider>
        </div>
    );
};

const OnboardingForm = ({ initialStep = 0 }: { initialStep?: number }) => {
    return (
        <StepperProvider initialStep={initialStep} key={0}>
            <OnboardingFlowForm />
        </StepperProvider>
    );
};

export default OnboardingForm;
