import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(createdAt: Date | string): string {
  const now = new Date();
  const createdDate = typeof createdAt === "string" ? new Date(createdAt) : createdAt;

  const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  const units: { [key: string]: number } = {
      year: 60 * 60 * 24 * 365,
      month: 60 * 60 * 24 * 30,
      day: 60 * 60 * 24,
      hour: 60 * 60,
      minute: 60,
      second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(units)) {
      const count = Math.floor(seconds / secondsInUnit);
      if (count >= 1) {
          return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
      }
  }

  return "just now";
}