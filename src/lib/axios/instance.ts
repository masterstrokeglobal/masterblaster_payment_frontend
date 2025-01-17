import axios, { AxiosInstance } from 'axios';

declare global {
    interface Window {
        Clerk?: {
            session?: {
                getToken: () => Promise<string>;
            };
        };
    }
}

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL??"https://bolt-payment-backend.onrender.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});


export default api;