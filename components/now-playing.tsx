"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { processLanyardData, type NowPlayingResult } from "@/lib/lanyard";
import { LiveProgress } from "./live-progress";
import { SyncedLyrics } from "./synced-lyrics";

// ... icons ... (keeping them as is)
function MusicIcon({ className = "h-[11px] w-[11px]" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} style={{ display: "block", flexShrink: 0, width: 11, height: 11 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18V5l12-2v13M9 18c0 1.657-1.79 3-4 3s-4-1.343-4-3 1.79-3 4-3 4 1.343 4 3Zm12-2c0 1.657-1.79 3-4 3s-4-1.343-4-3 1.79-3 4-3 4 1.343 4 3Z" />
    </svg>
  );
}

function SpotifyIcon({ className = "h-[11px] w-[11px]" }: { className?: string }) {
  return (
    <svg className={className} style={{ display: "block", flexShrink: 0, width: 11, height: 11 }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.54-1.02.72-1.56.3z"/>
    </svg>
  );
}

function AppleMusicIcon({ className = "h-[11px] w-[11px]" }: { className?: string }) {
  return (
    <svg className={className} style={{ display: "block", flexShrink: 0, width: 11, height: 11 }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.11 15.65c-.09.31-.38.52-.7.52H6.96c-.32 0-.6-.21-.7-.52L4.78 10.9c-.1-.31.02-.65.29-.83L11.53 5.4c.14-.1.35-.16.47-.16.12 0 .33.06.47.16l6.46 4.67c.27.18.39.52.29.83l-1.48 4.75z"/>
    </svg>
  );
}

function YoutubeMusicIcon({ className = "h-[11px] w-[11px]" }: { className?: string }) {
  return (
    <svg className={className} style={{ display: "block", flexShrink: 0, width: 11, height: 11 }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 14.5v-9l7 4.5-7 4.5z"/>
    </svg>
  );
}

export function NowPlayingSkeleton() {
  return (
    <div className="py-6 font-sans">
      <div className="mb-[10px] flex items-center gap-[6px] text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--pink)]">
        <span className="h-[6px] w-[6px] animate-[pulse_1.8s_ease-in-out_infinite] rounded-full bg-[var(--pink)]"></span>
        Loading...
      </div>
      <div className="flex max-w-[380px] items-center gap-[14px] rounded-[16px] border border-[var(--border-pink)] bg-[var(--pink-ultra)] p-[14px] px-[16px]">
        {/* Thumb */}
        <div className="flex h-[48px] w-[48px] shrink-0 animate-pulse bg-[var(--pink-light)] rounded-[8px]" />
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-[2px] h-[13px] w-[120px] animate-pulse rounded-full bg-[var(--pink-light)]" />
          <div className="mb-[8px] h-[12px] w-[80px] animate-pulse rounded-full bg-[var(--pink-light)] opacity-60" />
          <div className="h-[3px] w-full animate-pulse rounded-full bg-[var(--pink-light)] opacity-40" />
          <div className="mt-[5px] h-[10px] w-[60px] animate-pulse rounded-full bg-[var(--pink-light)] opacity-40" />
        </div>
      </div>
    </div>
  );
}

export function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingResult>({ status: "idle" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = process.env.NEXT_PUBLIC_DISCORD_USER_ID || "1028264332021575681"; // Fallback to provided ID
    
    let socket: WebSocket;
    let heartbeatInterval: NodeJS.Timeout;

    const connect = () => {
      socket = new WebSocket("wss://api.lanyard.rest/socket");

      socket.onopen = () => {
        console.log("Lanyard WebSocket Connected");
      };

      socket.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        const { op, d, t } = payload;

        if (op === 1) {
          // Hello OP: setup heartbeat
          heartbeatInterval = setInterval(() => {
            socket.send(JSON.stringify({ op: 3 }));
          }, d.heartbeat_interval);

          // Initialize with OP 2
          socket.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: userId },
            })
          );
        }

        if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
          const result = processLanyardData(d);
          setNowPlaying(result);
          setIsLoading(false);
        }
      };

      socket.onclose = () => {
        console.log("Lanyard WebSocket Disconnected. Retrying...");
        clearInterval(heartbeatInterval);
        setTimeout(connect, 5000);
      };

      socket.onerror = (err) => {
        console.error("Lanyard WebSocket Error:", err);
        socket.close();
      };
    };

    connect();

    return () => {
      clearInterval(heartbeatInterval);
      if (socket) socket.close();
    };
  }, []);

  if (isLoading) {
    return <NowPlayingSkeleton />;
  }

  if (nowPlaying.status === "error") {
    return (
      <div className="py-6 font-sans">
        <div className="mb-[10px] flex items-center gap-[6px] text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--gray)]">
          <span className="h-[6px] w-[6px] rounded-full bg-[var(--gray)] opacity-60"></span>
          Error
        </div>
        <div className="flex max-w-[380px] items-center gap-[14px] rounded-[16px] border border-[var(--border-pink)] bg-[var(--pink-ultra)] p-[14px] px-[16px]">
          <div className="flex h-[48px] w-[48px] shrink-0 flex-col items-center justify-center gap-[1px] overflow-hidden rounded-[8px] bg-[var(--dark)] p-[6px]">
            <span className="block text-[8px] font-bold leading-[1.3] tracking-[0.02em] text-[var(--white)]">#ERR</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-[2px] truncate text-[13px] font-semibold text-[var(--dark)]">Connection Sleep</div>
            <div className="mb-[8px] truncate text-[12px] text-[var(--gray)]">{nowPlaying.message}</div>
          </div>
        </div>
      </div>
    );
  }

  if (nowPlaying.status === "idle") {
    return (
      <div className="py-6 font-sans">
        <div className="mb-[10px] flex items-center gap-[6px] text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--pink)]">
          <span className="h-[6px] w-[6px] rounded-full bg-[var(--pink)] opacity-50"></span>
          Idle
        </div>
        <div className="flex max-w-[380px] items-center gap-[14px] rounded-[16px] border border-[var(--border-pink)] bg-[var(--pink-ultra)] p-[14px] px-[16px]">
          <div className="flex h-[48px] w-[48px] shrink-0 flex-col items-center justify-center gap-[1px] overflow-hidden rounded-[8px] bg-[var(--dark)] p-[6px]">
            <span className="block text-[8px] font-bold leading-[1.3] tracking-[0.02em] text-[var(--white)]">#IDLE</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-[2px] truncate text-[13px] font-semibold text-[var(--dark)]">Currently enjoying the silence</div>
            <div className="mb-[8px] truncate text-[12px] text-[var(--gray)]">No music playing</div>
          </div>
        </div>
      </div>
    );
  }

  const { track } = nowPlaying;
  
  const resolvePlatformBadge = () => {
    switch(track.platform.toLowerCase()) {
      case 'spotify': return <SpotifyIcon />;
      case 'apple music': return <AppleMusicIcon />;
      case 'youtube music': return <YoutubeMusicIcon />;
      default: return <MusicIcon />;
    }
  };

  return (
    <div className="py-6 font-sans pt-16 pb-64">
      <h2 className="sr-only">
        Now playing: {track.title} by {track.artist} on {track.platform}
      </h2>
      <div className="mb-[10px] flex items-center gap-[6px] text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--pink)]">
        <span className="h-[6px] w-[6px] animate-[pulse_1.8s_ease-in-out_infinite] rounded-full bg-[var(--pink)]"></span>
        Ray Sedang Mendengarkan
      </div>
      <div className="flex max-w-[380px] items-center gap-[14px] rounded-2xl px-4 py-[14px]">
        
        {/* Thumb */}
        <div className="relative flex h-[48px] w-[48px] shrink-0 flex-col items-center justify-center gap-[1px] overflow-hidden rounded-[8px] bg-[var(--dark)] p-[6px]">
          {track.albumCoverUrl ? (
            <Image
              src={track.albumCoverUrl}
              alt={track.title}
              width={48}
              height={48}
              unoptimized
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
             <>
               <span className="block text-[8px] font-bold leading-[1.3] tracking-[0.02em] text-[var(--white)]">#SAME</span>
               <span className="block text-[8px] font-bold leading-[1.3] tracking-[0.02em] text-[var(--white)]">#ME</span>
             </>
          )}
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-[2px] font-bold truncate text-[14px] text-[var(--dark)]" title={track.title}>
            {track.title}
          </div>
          <div className="mb-[8px] truncate text-[14px] text-[var(--gray)]" title={track.artist}>
            {track.artist}
          </div>
          
          <SyncedLyrics title={track.title} artist={track.artist} timestamps={track.timestamps} />
          
          <LiveProgress timestamps={track.timestamps} />
          
          <div className="mt-[5px] flex items-center gap-[4px] text-[14px] text-[var(--pink-dark)]">
            <span className="flex items-center justify-center shrink-0" style={{ width: 11, height: 11 }}>
              {resolvePlatformBadge()}
            </span>
            {track.platform}
          </div>
        </div>
      </div>
    </div>
  );
}
