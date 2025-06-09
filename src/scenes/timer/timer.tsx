import { interpolate, useCurrentFrame } from "remotion";
import { useTimer } from "../../hooks/use-timer";
import { z } from "zod";

export const timerSchema = z.object({
  isRunning: z.boolean().default(true),
});

export function Timer({ isRunning = true }: z.infer<typeof timerSchema>) {
  const frame = useCurrentFrame();
  const { timer } = useTimer({ isRunning });
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <div
      className="inset-y-0 absolute w-full text-6xl text-center text-black font-mono flex items-center justify-center"
      style={{ opacity }}
    >
      <p>
        <span>{timer.minutes}</span>
        <span>:</span>
        <span>{timer.seconds}</span>
      </p>
    </div>
  );
}
