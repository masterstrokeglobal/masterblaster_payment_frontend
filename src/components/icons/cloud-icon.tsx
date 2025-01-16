import * as React from "react";

const CloudIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="49"
        fill="none"
        viewBox="0 0 48 49"
        {...props}
    >
        <g
            stroke="#1550F7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            clipPath="url(#clip0_1801_22016)"
        >
            <path d="M14 36.5c-2.495 0-4.888-.948-6.652-2.636-1.765-1.687-2.756-3.977-2.756-6.364s.991-4.676 2.756-6.364S11.505 18.5 14 18.5c.59-2.625 2.313-4.933 4.793-6.414a12 12 0 0 1 4.05-1.497 12.4 12.4 0 0 1 4.38.011c1.444.263 2.817.78 4.04 1.52s2.271 1.69 3.086 2.794a9.6 9.6 0 0 1 1.664 3.646 9.1 9.1 0 0 1-.013 3.94h2a7 7 0 1 1 0 14h-2"></path>
            <path d="m18 30.5 6-6 6 6M24 24.5v18"></path>
        </g>
        <defs>
            <clipPath id="clip0_1801_22016">
                <path fill="#fff" d="M0 .5h48v48H0z"></path>
            </clipPath>
        </defs>
    </svg>
);

export default CloudIcon;
