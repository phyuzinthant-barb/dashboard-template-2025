import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseTime(timeString: string): {
  hours: number;
  minutes: number;
} {
  if (!timeString) return { hours: 0, minutes: 0 };

  // Handle different time string formats
  const timeParts = timeString.split(":");
  let hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  // Handle 12-hour format if needed (assuming your time input might include AM/PM)
  if (timeString.toLowerCase().includes("pm") && hours < 12) {
    hours += 12;
  }
  if (timeString.toLowerCase().includes("am") && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
}
