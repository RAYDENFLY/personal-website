import Image from "next/image";
import type { ReactNode } from "react";
import { getNowPlaying } from "@/lib/lanyard";

function MusicIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 18V5l12-2v13M9 18c0 1.657-1.79 3-4 3s-4-1.343-4-3 1.79-3 4-3 4 1.343 4 3Zm12-2c0 1.657-1.79 3-4 3s-4-1.343-4-3 1.79-3 4-3 4 1.343 4 3Z"
      />
    </svg>
  );
}

function NowPlayingShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white/90 p-4 shadow-[0_14px_40px_rgba(226,138,149,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(226,138,149,0.24)]">
      {children}
    </div>
  );
}

export function NowPlayingSkeleton() {
  return (
    <NowPlayingShell>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-2xl bg-pink-100" />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-3 w-24 animate-pulse rounded-full bg-pink-100" />
          <div className="h-4 w-44 max-w-full animate-pulse rounded-full bg-pink-100" />
          <div className="h-3 w-32 animate-pulse rounded-full bg-pink-50" />
        </div>
      </div>
    </NowPlayingShell>
  );
}

export async function NowPlaying() {
  const nowPlaying = await getNowPlaying();

  if (nowPlaying.status === "error") {
    return (
      <NowPlayingShell>
        <div className="flex items-start gap-3 text-sm text-pink-950">
          <div className="rounded-full bg-pink-100 p-2 text-pink-500">
            <MusicIcon />
          </div>
          <div>
            <p className="font-semibold text-pink-600">Now Playing unavailable</p>
            <p className="mt-1 text-gray-500">{nowPlaying.message}</p>
          </div>
        </div>
      </NowPlayingShell>
    );
  }

  if (nowPlaying.status === "idle") {
    return (
      <NowPlayingShell>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="rounded-full bg-pink-100 p-2 text-pink-500">
            <MusicIcon />
          </div>
          <p>Not listening to anything right now.</p>
        </div>
      </NowPlayingShell>
    );
  }

  const { track } = nowPlaying;

  return (
    <NowPlayingShell>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-pink-100 text-pink-500">
          {track.albumCoverUrl ? (
            <Image
              src={track.albumCoverUrl}
              alt={`${track.title} album cover`}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <MusicIcon />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-pink-500">
            <MusicIcon />
            <span>{track.platform}</span>
          </div>
          <p className="truncate text-base font-bold text-[#1a1a1a]">{track.title}</p>
          <p className="truncate text-sm text-gray-500">{track.artist}</p>
        </div>
      </div>
    </NowPlayingShell>
  );
}
