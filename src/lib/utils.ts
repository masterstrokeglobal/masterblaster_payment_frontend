import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomID = () => Math.random().toString(36).substr(2, 9);

export const appName = process.env.NEXT_PUBLIC_APP_NAME || "Bolt Payments";

export const getExtension = (format: "excel" | "pdf" | "csv") => {
  if (format === "excel") return "xlsx";
  if (format === "pdf") return "pdf";
  if (format === "csv") return "csv";
  return "xlsx";
};


export const getContentType = (format: "excel" | "pdf" | "csv") => {
  if (format === "excel") return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (format === "pdf") return "application/pdf";
  if (format === "csv") return "text/csv";
  return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
};
