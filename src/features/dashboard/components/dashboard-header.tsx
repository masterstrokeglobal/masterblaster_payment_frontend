import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserDropdown from "./user-menu";

const DashboardHeader = () => {
    return (
        <header className="flex h-20 md:bg-background bg-white shrink-0 items-center justify-between gap-2 px-4">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-xl font-bold">Edit Profile</h2>
            <UserDropdown>
                <Avatar>
                    <AvatarImage src="/images/avatar.jpg" alt="avatar" />
                    <AvatarFallback>
                        J
                    </AvatarFallback>
                </Avatar>
            </UserDropdown>
        </header>
    );
};


export default DashboardHeader;