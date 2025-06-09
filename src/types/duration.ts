import { z } from "zod";

export const durationSchema = z.object({
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
});

export type Duration = z.infer<typeof durationSchema>;

export interface FormattedDuration {
  hours: string;
  minutes: string;
  seconds: string;
}

export function durationToSeconds(duration: Duration): number {
  const hoursInSeconds = (duration.hours ?? 0) * 3600;
  const minutesInSeconds = (duration.minutes ?? 0) * 60;
  const seconds = duration.seconds ?? 0;

  return hoursInSeconds + minutesInSeconds + seconds;
}

export function secondsToDuration(seconds: number): Duration {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return {
    hours,
    minutes,
    seconds: remainingSeconds,
  };
}

export function formatDuration(duration: Duration): FormattedDuration {
  const hours = String(duration.hours ?? 0).padStart(2, "0");
  const minutes = String(duration.minutes ?? 0).padStart(2, "0");
  const seconds = String(duration.seconds ?? 0).padStart(2, "0");

  return {
    hours,
    minutes,
    seconds,
  };
}
