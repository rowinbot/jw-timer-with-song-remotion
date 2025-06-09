import { useMemo } from "react";
import {
  formatDuration,
  FormattedDuration,
  secondsToDuration,
} from "../types/duration";
import { useCurrentFrame, useVideoConfig } from "remotion";

export function useFrameTimer() {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const timeElapsedSeconds = Math.floor(frame / videoConfig.fps);

  const duration = useMemo((): FormattedDuration => {
    const duration = secondsToDuration(timeElapsedSeconds);
    return formatDuration(duration);
  }, [timeElapsedSeconds]);

  return {
    timeElapsedSeconds,
    duration,
  };
}
