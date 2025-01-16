"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const UserDropdown: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            router.push("/auth/login");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer hover:border-primary border border-transparent">
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-96 w-full rounded-2xl p-4">
                <div className="bg-gradient-to-br relative mb-12 from-[#91BAFF] to-[#1550F7] h-24 tracking-[-2%] font-semibold rounded-xl flex justify-center items-start pt-4 text-lg font-jakarta">
                    <h2 className="text-white">{ }</h2>
                    <Link href="/dashboard/profile" className="absolute top-[50%]">
                        <Avatar className="w-[5.5rem] h-[5.5rem] md:w-[5.5rem] md:h-[5.5rem] border-4 border-white">
                            <AvatarImage className="w-[5.5rem] h-[5.5rem]" src="/images/avatar.jpg" alt="User" />
                            <AvatarFallback className="w-[5.5rem] h-[5.5rem] md:w-[5.5rem] md:h-[5.5rem]"  >T</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
                <div className="text-center text-lg font-semibold mb-4 text-black-heading">
                </div>
                <Button className="mb-4 w-fit mx-auto block">Billing & Subscription</Button>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/calender">
                        My Calendars
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/privacy">
                        Support & Feedback
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/privacy">
                        Privacy
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;