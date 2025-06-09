import { interpolate, useCurrentFrame } from "remotion";

import { loadFont } from "@remotion/google-fonts/AzeretMono";
import { FormattedDuration } from "../types/duration";
const { fontFamily } = loadFont();

export function Clock({ duration }: { duration: FormattedDuration }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <div
      className="inset-y-0 absolute w-full flex items-center justify-center bg-black"
      style={{ opacity, fontFamily }}
    >
      <p className="relative text-[22rem] text-center text-white font-[50] tracking-tighter flex gap-20 items-center justify-center leading-none">
        <span>{duration.minutes}</span>
        <span className="absolute block bottom-[11.5785%]">:</span>
        <span>{duration.seconds}</span>
      </p>
    </div>
  );
}
