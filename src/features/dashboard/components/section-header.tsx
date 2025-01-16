import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    title: string;
}>;

const SectionHeader = ({ title, children }: Props) => {
    return (
        <header className="md:flex h-[76px] hidden  border-b shrink-0 items-center justify-between gap-2 px-5">
            <h2 className="text-black-title text-xl font-bold">{title}</h2>
            {children}
        </header>
    );
};

export default SectionHeader;
