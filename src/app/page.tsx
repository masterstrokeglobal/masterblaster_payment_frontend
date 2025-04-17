"use client";
import LogoText from "@/components/common/logo-text";
import useCheckAuth from "@/hooks/use-signin-route";
import RapidPay24Logo from "../../public/images/logo-transparent-png.png"
import Image from "next/image";
export default function Home() {
  useCheckAuth();
  return (
    <section className="flex justify-center items-center h-screen">
      {/* <LogoText className="mb-4 animate-pulse" /> */}
      <Image className="mb-4 animate-pulse w-52" alt="rapidpay24" src={RapidPay24Logo} />
    </section>
  );
}
