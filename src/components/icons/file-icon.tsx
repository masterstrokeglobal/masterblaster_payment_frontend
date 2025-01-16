import * as React from "react";

const FileIcon= (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        fill="none"
        viewBox="0 0 24 25"
        {...props}
    >
        <path
            stroke="#1550F7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.308 4.5h5.521q.086 0 .171.011a4.3 4.3 0 0 1 4 4.275v6.429a4.3 4.3 0 0 1-4.308 4.285H9.308A4.3 4.3 0 0 1 5 15.214V8.786A4.3 4.3 0 0 1 9.308 4.5"
            clipRule="evenodd"
        ></path>
        <path
            fill="#1550F7"
            d="M19 9.537a.75.75 0 0 0 0-1.5zm-4-.75h-.75c0 .414.336.75.75.75zm.75-4.275a.75.75 0 0 0-1.5 0zM11 16.25a.75.75 0 0 0 0-1.5zm-3-1.5a.75.75 0 0 0 0 1.5zm7-1.5a.75.75 0 0 0 0-1.5zm-7-1.5a.75.75 0 0 0 0 1.5zm11-3.714h-4v1.5h4zm-3.25.75V4.512h-1.5v4.275zM11 14.75H8v1.5h3zm4-3H8v1.5h7z"
        ></path>
    </svg>
);

export default FileIcon;
