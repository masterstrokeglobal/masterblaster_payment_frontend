import * as React from "react";

const FilterIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        {...props}
    >
        <path
            stroke="#334054"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M14.667 2H1.333l5.334 6.307v4.36L9.333 14V8.307z"
        ></path>
    </svg>
);

export default FilterIcon;
