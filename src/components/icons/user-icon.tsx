import * as React from "react";

const UserIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
        {...props}
    >
        <path
            stroke="#485467"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.292 6.458a2.292 2.292 0 1 1-4.583 0 2.292 2.292 0 0 1 4.583 0"
            clipRule="evenodd"
        ></path>
        <path
            fill="#485467"
            d="M5.917 13.115a.5.5 0 1 0-1 .03zm2.32 2.676v-.5h-.013zm3.526 0 .014-.5h-.014zm3.32-2.647a.5.5 0 1 0-1-.03zm-1-.12a.5.5 0 0 0 1-.03zm-2.32-2.677v.5h.014zm-3.525 0-.014.5h.014zm-3.32 2.647a.5.5 0 1 0 .999.03zm0 .15a3.244 3.244 0 0 0 3.334 3.147l-.028-1a2.244 2.244 0 0 1-2.307-2.177zm3.32 3.147h3.525v-1H8.238zm3.51 0a3.244 3.244 0 0 0 3.335-3.147l-1-.03a2.244 2.244 0 0 1-2.306 2.177zm3.335-3.297a3.244 3.244 0 0 0-3.334-3.147l.028 1a2.244 2.244 0 0 1 2.307 2.176zm-3.32-3.147H8.238v1h3.525zm-3.511 0a3.244 3.244 0 0 0-3.335 3.147l1 .03a2.244 2.244 0 0 1 2.307-2.177z"
        ></path>
    </svg>
);

export default UserIcon;