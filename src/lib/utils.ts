import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomID = () => Math.random().toString(36).substr(2, 9);

export const appName = process.env.NEXT_PUBLIC_APP_NAME || "Bolt Payments";