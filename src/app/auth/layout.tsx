"use client";

import { appName } from "@/lib/utils";
import { CreditCard, Globe, ShieldCheck, Zap } from "lucide-react";
import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Lightning Fast Payments",
      description: "Process transactions instantly with our optimized payment flow"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Bank-Grade Security",
      description: "Enterprise-level encryption and fraud protection systems"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      title: "Multiple Payment Methods",
      description: "Accept credit cards, digital wallets, and direct bank transfers"
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Global Coverage",
      description: "Process payments in multiple currencies worldwide"
    }
  ];

  return (
    <section className="grid md:grid-cols-12 sm:grid-cols-8 grid-cols-4 gap-4 px-4 min-h-screen bg-white">
      <main className="xl:col-span-5 md:col-span-6 sm:col-span-8 col-span-4 bg-white flex items-center justify-center">
        {children}
      </main>

      <aside className="xl:col-span-7 md:col-span-6 col-span-4 bg-background rounded-[1.25rem] hidden md:flex flex-col mt-4 pt-12 pl-12 -mr-4">
        <header className="space-y-6 mb-12">
          <div className="space-y-2.5">
            <h1 className="text-3xl text-black-sub-heading font-bold">
              Seamless Payments Made Simple
            </h1>
            <p className="text-black-caption text-lg max-w-md">
              Join thousands of businesses using {appName} to process transactions securely and efficiently. Experience the future of payment processing today.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex -space-x-3">
              <img
                src="/api/placeholder/48/48"
                alt="Business User"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <img
                src="/api/placeholder/48/48"
                alt="Business User"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <img
                src="/api/placeholder/48/48"
                alt="Business User"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </div>
            <p className="text-sm text-black-caption">
              Trusted by 50,000+ businesses worldwide
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-black-sub-heading">
                {feature.title}
              </h3>
              <p className="text-sm text-black-caption">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <footer className="mt-auto pb-12">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-primary">
                PCI DSS Level 1
              </p>
            </div>
            <div className="bg-primary/10 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-primary">
                256-bit Encryption
              </p>
            </div>
            <div className="bg-primary/10 px-4 py-2 rounded-lg">
              <p className="text-sm font-medium text-primary">
                99.99% Uptime
              </p>
            </div>
          </div>
        </footer>
      </aside>
    </section>
  );
};

export default AuthLayout;