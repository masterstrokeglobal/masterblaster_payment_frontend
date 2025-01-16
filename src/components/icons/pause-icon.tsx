import * as React from "react";

const PauseIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="28"
        fill="none"
        viewBox="0 0 29 28"
        {...props}
    >
        <rect width="3" height="12" x="10" y="8" fill="#101828" rx="1.5"></rect>
        <rect width="3" height="12" x="16" y="8" fill="#101828" rx="1.5"></rect>
    </svg>
);

export default PauseIcon;
