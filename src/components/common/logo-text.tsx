import { appName, cn } from "@/lib/utils";

const LogoText = ({ className }: PropsWithClassName) => {
    return (
        <div className={cn("text-2xl font-giest font-bold", className)}>
            {appName}
        </div>
    );
}

export default LogoText;