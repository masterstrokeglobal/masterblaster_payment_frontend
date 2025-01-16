import * as React from "react";

const NotificationIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            fill="#485467"
            d="M5.806 8.512C5.806 4.915 8.579 2 12 2s6.194 2.915 6.194 6.512v2.817c0 1.17.489 2.29 1.352 3.098.95.886.31 2.457-.999 2.457H5.453c-1.31 0-1.948-1.57-1-2.457a4.24 4.24 0 0 0 1.353-3.098zM12 22c1.68 0 3.04-1.28 3.04-2.857v-.08c-.007-.23-.22-.398-.465-.4l-5.138-.056c-.245-.002-.462.16-.474.391l-.004.145C8.96 20.72 10.321 22 12 22"
        ></path>
    </svg>
);

export default NotificationIcon;
