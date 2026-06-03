"use client";

import { useEffect, useState } from "react";

type LyricLine = {
  timeMs: number;
  text: string;
};

// Parser for the standard LRC format
function parseLRC(lrc: string): LyricLine[] {
  const lines = lrc.split("\n");
  const result: LyricLine[] = [];
  // Regex to match [mm:ss.xx] or [mm:ss.xxx]
  const regex = /\[(\d{2}):(\d{2}(?:\.\d{2,3})?)\](.*)/;

  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseFloat(match[2]);
      const text = match[3].trim();
      const timeMs = (minutes * 60 + seconds) * 1000;
      
      // Ignore empty text lines for a cleaner 1-line display
      if (text) {
        result.push({ timeMs, text });
      }
    }
  }
  return result;
}

type SyncedLyricsProps = {
  title: string;
  artist: string;
  timestamps?: {
    start: number;
    end?: number;
  };
};

export function SyncedLyrics({ title, artist, timestamps }: SyncedLyricsProps) {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [activeLine, setActiveLine] = useState<string>("♪");

  // 1. Fetch Lyrics
  useEffect(() => {
    let active = true;
    setActiveLine("♪"); // reset

    const fetchLyrics = async () => {
      try {
        // Try getting exact match first
        const url = new URL("https://lrclib.net/api/get");
        url.searchParams.set("artist_name", artist);
        url.searchParams.set("track_name", title);
        
        const res = await fetch(url.toString(), {
          // Add a short timeout logic if necessary, but lrclib is quite fast
          headers: { "LrcLib-Client": "RayPersonalWeb (Unknown)" }
        });
        
        if (!res.ok) {
           // Fallback to text search if exact get fails
           // Clean artist name to improve search hit rate (e.g. "Crawla; Leend" -> "Crawla")
           const cleanArtist = artist.split(/[,;&/]| feat\.? | ft\.? /i)[0].trim();
           
           const searchUrl = new URL("https://lrclib.net/api/search");
           searchUrl.searchParams.set("q", `${title} ${cleanArtist}`);
           const searchRes = await fetch(searchUrl.toString());
           
           if (searchRes.ok) {
              const items = await searchRes.json();
              // Find the first result that has synced lyrics
              const hit = items.find((i: any) => i.syncedLyrics);
              if (hit && active) {
                 setLyrics(parseLRC(hit.syncedLyrics));
                 return;
              }
           }
           if (active) setLyrics([]);
           return;
        }

        const data = await res.json();
        if (data.syncedLyrics && active) {
          setLyrics(parseLRC(data.syncedLyrics));
        } else {
          if (active) setLyrics([]);
        }
      } catch (err) {
        if (active) setLyrics([]);
      }
    };
    
    fetchLyrics();
    
    return () => { active = false; };
  }, [title, artist]);

  // 2. Synchronize with Playback
  useEffect(() => {
    if (lyrics.length === 0 || !timestamps) {
       return;
    }
    
    const interval = setInterval(() => {
      const elapsedMs = Date.now() - timestamps.start;
      
      // Find the active line (the last one whose timestamp passed)
      let current = "♪";
      for (let i = 0; i < lyrics.length; i++) {
        // Lookahead bounds allowing slight leading anticipation (e.g. 250ms)
        if (elapsedMs >= lyrics[i].timeMs - 250) {
          current = lyrics[i].text;
        } else {
          break; // Optimization: Lrc bounds strictly sorted
        }
      }
      
      setActiveLine(current);
    }, 100); // 100ms interval for extremely snappy response

    return () => clearInterval(interval);
  }, [lyrics, timestamps]);

  // Don't render the wrapper if there are no lyrics, preserving layout spacing perfectly.
  if (lyrics.length === 0) return null;

  return (
    <div className="h-[20px] mb-[4px] mt-[2px] overflow-hidden">
      <p 
        key={activeLine} 
        className="truncate text-[12px] italic text-[var(--pink)] animate-[fadeUp_0.3s_ease_both]"
      >
        {activeLine}
      </p>
    </div>
  );
}
