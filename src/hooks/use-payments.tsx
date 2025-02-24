import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL; // Fetch WebSocket URL from env

export enum WebSocketEvent {
    MERCHANT_QR_CREATED = "merchant_qr_created",
    MERCHANT_QR_UPDATED = "merchant_qr_updated",
}

export const useMerchantQrWebSocket = (): void => {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!WS_URL) {
            console.error("WebSocket URL is not defined. Check your .env.local file.");
            return;
        }

        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            console.log("WebSocket connected to:", WS_URL);
        };

        ws.onmessage = (event: MessageEvent) => {
            try {
                const message: { event: WebSocketEvent; data: any } = JSON.parse(event.data);
                if (
                    message.event === WebSocketEvent.MERCHANT_QR_CREATED ||
                    message.event === WebSocketEvent.MERCHANT_QR_UPDATED
                ) {
                    queryClient.invalidateQueries({
                        predicate: (query) => query.queryKey[0] === "merchant-qrs",
                    });
                }
            } catch (error) {
                console.error("Error parsing WebSocket message", error);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            ws.close();
        };
    }, [queryClient]);
};
