import "./index.css";
import { Composition, staticFile } from "remotion";
import { Timer, timerSchema } from "./scenes/timer";
import { Countdown, countdownSchema } from "./scenes/countdown";
import { durationToSeconds } from "./types/duration";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  const frames = 30;
  const durationInSeconds = durationToSeconds({
    minutes: 5,
  });
  const durationInFrames = frames * durationInSeconds;

  return (
    <>
      <Composition
        id="Countdown"
        component={Countdown}
        durationInFrames={durationInFrames}
        fps={30}
        width={1920}
        height={1080}
        schema={countdownSchema}
        defaultProps={{
          duration: {
            hours: 0,
            minutes: 5,
            seconds: 0,
          },
          song: staticFile(
            "assets/songs/_si_lo_haces_por__l__lo_haces_por_m__.mp4",
          ),
        }}
      />
      <Composition
        id="Timer"
        component={Timer}
        durationInFrames={durationInFrames}
        fps={30}
        width={1920}
        height={1080}
        schema={timerSchema}
        defaultProps={{
          isRunning: true,
        }}
      />
      {/* 
      // Mount any React component to make it show up in the sidebar and work on it individually!
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      /> */}
    </>
  );
};
