import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

  const timer = useMemo(() => {
    const minutes = Math.floor(timeElapsedSeconds / 60);
    const seconds = Math.floor(timeElapsedSeconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return { minutes: formattedMinutes, seconds: formattedSeconds };
  }, [timeElapsedSeconds]);

  return {
    timeElapsedSeconds,
    timer,
    stop,
    reset,
  };
}
