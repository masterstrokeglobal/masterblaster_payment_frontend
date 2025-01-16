import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" }
];

export const pronounOptions = [
  { label: "He/Him", value: "He/Him" },
  { label: "She/Her", value: "She/Her" },
  { label: "They/Them", value: "They/Them" },
  { label: "Other", value: "Other" }
];
