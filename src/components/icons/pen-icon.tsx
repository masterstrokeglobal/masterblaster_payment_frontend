import * as React from "react";

const PenIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        fill="none"
        viewBox="0 0 24 25"
        {...props}
    >
        <path
            fill="currentColor"
            d="M20.952 3.548a3.58 3.58 0 0 0-5.06 0L3.94 15.5a3.1 3.1 0 0 0-.825 1.476L2.02 21.578a.75.75 0 0 0 .904.903l4.601-1.096a3.1 3.1 0 0 0 1.477-.825L20.952 8.61a3.58 3.58 0 0 0 0-5.06m-4 1.06a2.078 2.078 0 1 1 2.94 2.94L19 8.439 16.06 5.5zM15 6.562l2.94 2.94L7.94 19.5c-.21.21-.474.357-.763.426l-3.416.814.813-3.416c.069-.29.217-.554.427-.764z"
        ></path>
    </svg>
);

export default PenIcon;
