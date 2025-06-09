import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  formatDuration,
  FormattedDuration,
  secondsToDuration,
} from "../types/duration";

export function useTimer(props: { isRunning: boolean }) {
  const animationFrameIdRef = useRef<number | null>(null);
  const [timeElapsedSeconds, setTimeElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!props.isRunning) return;

    let timestamp = performance.now();

    const renderLoop = () => {
      const currentTimestamp = performance.now();
      const delta = (currentTimestamp - timestamp) / 1000; // Convert to seconds
      timestamp = currentTimestamp;

      setTimeElapsedSeconds((prev) => prev + delta);
      window.requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = window.requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [props.isRunning]);

  const reset = useCallback(() => {
    setTimeElapsedSeconds(0);
  }, []);

  const duration = useMemo((): FormattedDuration => {
    const duration = secondsToDuration(timeElapsedSeconds);
    return formatDuration(duration);
  }, [timeElapsedSeconds]);

  return {
    timeElapsedSeconds,
    duration,
    stop,
    reset,
  };
}
