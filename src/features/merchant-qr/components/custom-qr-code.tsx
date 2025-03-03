import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { MerchantQr } from "../type";

type QRCodeProps = {
    id?: string;
    merchantQr: MerchantQr;
    width?: number;
    height?: number;
    backgroundColor?: string;
};

const QRCode: React.FC<QRCodeProps> = ({
    merchantQr,
    width = 200,
    height = 200,
    backgroundColor = "#fff",
}) => {
    const qrRef = useRef<HTMLDivElement>(null);
    const qrCode = useRef<QRCodeStyling>();

    // Create QR code content from UPI ID
    const content = `upi://pay?pa=${merchantQr?.upiId}`;

    useEffect(() => {
        if (!qrCode.current) {
            // Initialize QR code instance
            qrCode.current = new QRCodeStyling({
                width,
                height,
                type: "svg",
                data: content,
                image: "/logo.png",
                dotsOptions: {
                    color: "#000",
                    type: "square"
                },
                cornersSquareOptions: {
                    color: "#000",
                    type: "square"
                },
                cornersDotOptions: {
                    color: "#000",
                    type: "square"
                },
                backgroundOptions: {
                    color: backgroundColor,
                }
            });
        } else {
            // Update existing QR code
            qrCode.current.update({
                data: content,
                backgroundOptions: {
                    color: backgroundColor,
                },
                width,
                height,
            });
        }

        // Render QR code to the DOM
        if (qrRef.current && qrCode.current) {
            qrRef.current.innerHTML = "";
            qrCode.current.append(qrRef.current);
        }
    }, [content, width, height, backgroundColor]);

    return <div ref={qrRef} style={{ margin: "2em auto" }} />;
};

export default QRCode;