import {
  durationSchema,
  durationToSeconds,
  formatDuration,
  secondsToDuration,
} from "../../types/duration";
import { useMemo } from "react";
import { Clock } from "../../components/clock";
import { z } from "zod";
import { useFrameTimer } from "../../hooks/use-frame-timer";
import { Audio, staticFile } from "remotion";

export const countdownSchema = z.object({
  duration: durationSchema,
});

export function Countdown({ duration }: z.infer<typeof countdownSchema>) {
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

      <Audio
        src={staticFile(
          "assets/songs/_si_lo_haces_por__l__lo_haces_por_m__.mp4",
        )}
      />
    </>
  );
}
