"use client";
import LogoText from "@/components/common/logo-text";
import useCheckAuth from "@/hooks/use-signin-route";
export default function Home() {
  useCheckAuth();
  return (
    <section className="flex justify-center items-center h-screen">
      <LogoText className="mb-4 animate-pulse" />
    </section>
  );
}
