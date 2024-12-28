import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterNullValues(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined
    )
  );
}

export function buildParams(params: Object) {
  const searchParams = new URLSearchParams(filterNullValues(params));
  return searchParams.toString();
}
