import { appName, cn } from "@/lib/utils";

const Logo = ({ className }: PropsWithClassName) => {
    return (
        <div className={cn('text-lg font-bold', className)}>
            {appName}
        </div>
    );
}

export default Logo;