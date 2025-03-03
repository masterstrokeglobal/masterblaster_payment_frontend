"use client";
import { cn } from "@/lib/utils";
import { BriefcaseBusiness, Building, Clock, DollarSign, Home, LucideIcon, QrCodeIcon, Repeat1, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuthStore } from '@/context/auth-context';
import Admin, { AdminRole } from '@/models/admin';
import Logo from "./common/logo";

interface SubMenuItem {
    name: string;
    link: string;
}

interface MenuItem {
    name: string;
    icon: LucideIcon;
    link?: string;
    subItems?: SubMenuItem[];
}
const adminMenuItems: MenuItem[] = [
    {
        name: 'Dashboard',
        icon: Home,
        link: '/dashboard',
    },
    {
        name: 'Merchants',
        icon: BriefcaseBusiness,
        link: '/dashboard/merchants',
    },
    {
        name: 'Transactions',
        icon: Users,
        link: '/dashboard/transactions',
    },
    //payouts
    {
        name: 'Payouts',
        icon: DollarSign,
        link: '/dashboard/payouts',
    },

    /* {
        name:"Holidays",
        icon: Clock,
        link:'/dashboard/holiday'
    } */
];


const merchantMenuItems: MenuItem[] = [
    {
        name: 'Dashboard',
        icon: Home,
        link: '/dashboard/merchant-dashboard',
    },
    {
        name: 'Transactions',
        icon: Users,
        link: '/dashboard/transactions',
    },
    {
        name: 'Payouts',
        icon: DollarSign,
        link: '/dashboard/payouts',
    },
    {
        name: "User Payouts",
        icon: DollarSign,
        link: '/dashboard/user-payouts'
    },
    {
        name: "QR Codes",
        icon: QrCodeIcon,
        link: '/dashboard/qr-codes'
    },
    {
        name: "Payout Options",
        icon: Repeat1,
        link: '/dashboard/payout-options'
    }
];



const Sidebar = ({ className }: PropsWithClassName) => {
    const pathname = usePathname();
    const { userDetails } = useAuthStore();

    const renderMenuItem = (item: MenuItem) => {
        const isActive = pathname === item.link ||
            (item.subItems && item.subItems.some(subItem => pathname === subItem.link));

        if (item.subItems) {
            return (
                <AccordionItem value={item.name} key={item.name}>
                    <AccordionTrigger className={cn(
                        "flex items-center py-2 px-4 text-sm font-medium [&[data-state=open]]:text-black [&[data-state=open]]:bg-gray-200 [&[data-state=open]]:rounded-b-none rounded-md hover:bg-primary ",
                        isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}>
                        <span className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className='bg-gray-200 rounded-b-md pl-4'>
                        <div className="flex flex-col space-y-1 px-4">
                            {item.subItems.map((subItem) => (
                                <Link
                                    key={subItem.name}
                                    href={subItem.link}
                                    className={cn(
                                        "flex items-center py-2 px-2 text-sm font-medium rounded-md hover:bg-gray-300 hover:text-accent-foreground",
                                        "transition-colors duration-200",
                                        pathname === subItem.link && "bg-primary/50 text-accent-foreground"
                                    )}
                                >
                                    {subItem.name}
                                </Link>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            );
        } else if (item.link) {
            return (
                <Link
                    key={item.name}
                    href={item.link}
                    className={cn(
                        "flex items-center py-2 px-4 text-sm font-medium rounded-md hover:bg-blue-100 hover:text-accent-foreground",
                        "transition-colors duration-200",
                        isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    )}
                >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                </Link>
            );
        }
        return null;
    };

    const menuItems = userDetails?.role === AdminRole.SUPER_ADMIN ? adminMenuItems : merchantMenuItems;

    return (
        <div className={cn("flex  flex-col ", className)}>
            <div className="flex h-16 items-center  px-4">
                <Logo />
            </div>
            <nav className="flex-1 overflow-y-auto px-4 pt-8">
                <Accordion type="multiple" className="w-full space-y-2">
                    {menuItems.map(renderMenuItem)}
                </Accordion>
            </nav>
        </div>
    );
};

export default Sidebar;