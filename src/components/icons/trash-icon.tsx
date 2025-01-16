import * as React from "react";

const TrashIcon =  (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        fill="none"
        viewBox="0 0 24 25"
        {...props}
    >
        <path
            fill="#101828"
            d="M10 5.5h4a2 2 0 1 0-4 0m-1.5 0a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32L18.76 19.111a3.75 3.75 0 0 1-3.733 3.389H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 7H2.75a.75.75 0 0 1 0-1.5zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zm3.75-.75a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75m-7.516 9.467A2.25 2.25 0 0 0 8.974 21h6.052a2.25 2.25 0 0 0 2.24-2.033L18.424 7H5.576z"
        ></path>
    </svg>
);

export default TrashIcon;
