import * as React from "react";

const PlayIcon = (props: React.HTMLAttributes<SVGElement>) => (

    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        fill="none"
        viewBox="0 0 28 28"
        {...props}
    >
        <path
            fill="#292929"
            d="M10 8.667v10.667a.667.667 0 0 0 1.016.567l8.667-5.333a.668.668 0 0 0 0-1.136L11.016 8.1A.667.667 0 0 0 10 8.667"
        ></path>
    </svg>
);


export default PlayIcon;
