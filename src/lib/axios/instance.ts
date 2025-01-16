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
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await window.Clerk?.session?.getToken();

        console.log('Token:', token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error('Error getting Clerk session token:', error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;