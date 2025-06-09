import { z } from "zod";
import { Clock } from "../../components/clock";
import { useFrameTimer } from "../../hooks/use-frame-timer";

export const timerSchema = z.object({});

export function Timer() {
  const { duration } = useFrameTimer();

  return <Clock duration={duration} />;
}
