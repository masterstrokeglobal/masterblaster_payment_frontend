import * as React from "react";

const ClockIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        fill="none"
        viewBox="0 0 25 24"
        {...props}
    >
        <path
            stroke="#667085"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12.5 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14"
            clipRule="evenodd"
        ></path>
        <path
            stroke="#667085"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.411 10.164v3.412h3.267"
        ></path>
    </svg>
);

export default ClockIcon;
