import * as React from "react";

const AttachmentIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke="#485467"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m14.67 11.053-3.99 4.262a1.81 1.81 0 0 1-2.669.031 2.04 2.04 0 0 1 .029-2.852l5.359-5.731a3.14 3.14 0 0 1 4.646-.027 3.68 3.68 0 0 1-.021 4.964l-5.682 6.071a4.17 4.17 0 0 1-6.056-.153 5.11 5.11 0 0 1 .1-6.888L11.753 5"
        ></path>
    </svg>
);

export default AttachmentIcon;
