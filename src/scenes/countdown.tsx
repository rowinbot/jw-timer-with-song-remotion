import {
  durationSchema,
  durationToSeconds,
  formatDuration,
  secondsToDuration,
} from "../types/duration";
import { useMemo } from "react";
import { Clock } from "../components/clock";
import { z } from "zod";
import { useFrameTimer } from "../hooks/use-frame-timer";
import { Audio } from "remotion";

export const countdownSchema = z.object({
  duration: durationSchema,
  song: z.string(),
});

export function Countdown({ duration, song }: z.infer<typeof countdownSchema>) {
  const { timeElapsedSeconds } = useFrameTimer();

  const durationInSeconds = useMemo(
    () => durationToSeconds(duration),
    [duration],
  );

  const durationLeft = useMemo(() => {
    const seconds = durationInSeconds - timeElapsedSeconds;

    const left = secondsToDuration(seconds < 0 ? 0 : seconds);
    return formatDuration(left);
  }, [durationInSeconds, timeElapsedSeconds]);

  return (
    <>
      <Clock duration={durationLeft} />

      <Audio src={song} />
    </>
  );
}
