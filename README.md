# JW Timer with Song Remotion

A Remotion project to create a video timer with a song from JW.org.
This project allows you to create a countdown timer video with a song from JW.org, using Remotion. The timer can be customized in terms of duration and the song can be downloaded and used in the video.

To change the song:

1. Update the `scripts/download-jw-song.ts` file to use a different audio source replacing the current value for the `song` constant and following the instructions below to download the new song
2. Update the `song` property in the `defaultProps` for the Countdown scene in `src/root.ts` to point to the new song file (please, include the file extension and make the path relative to the `/public/` directory).

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

## To download the latest song locally

```console
npm run scripts:download-jw-song
```
