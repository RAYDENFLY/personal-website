export type MusicPlatform = "Spotify" | "YouTube Music" | "Apple Music";

export type NowPlayingTrack = {
  title: string;
  artist: string;
  platform: MusicPlatform;
  albumCoverUrl?: string;
  timestamps?: {
    start: number;
    end?: number;
  };
};

export type NowPlayingResult =
  | {
      status: "playing";
      track: NowPlayingTrack;
    }
  | {
      status: "idle";
    }
  | {
      status: "error";
      message: string;
    };

type LanyardSpotify = {
  song?: string;
  artist?: string;
  album_art_url?: string;
  timestamps?: {
    start: number;
    end?: number;
  };
};

type LanyardActivityAssets = {
  large_image?: string;
  large_text?: string;
};

type LanyardActivity = {
  application_id?: string;
  name?: string;
  details?: string;
  state?: string;
  assets?: LanyardActivityAssets;
  timestamps?: {
    start?: number;
    end?: number;
  };
};

type LanyardResponse = {
  success: boolean;
  data?: {
    activities?: LanyardActivity[];
    spotify?: LanyardSpotify | null;
  };
};

const MUSIC_PLATFORMS: MusicPlatform[] = ["YouTube Music", "Spotify", "Apple Music"];

function getPlatform(activityName?: string): MusicPlatform | undefined {
  return MUSIC_PLATFORMS.find((platform) => activityName?.toLowerCase() === platform.toLowerCase());
}

function resolveActivityImage(activity: LanyardActivity): string | undefined {
  const image = activity.assets?.large_image;

  if (!image) {
    return undefined;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("spotify:")) {
    return `https://i.scdn.co/image/${image.replace("spotify:", "")}`;
  }

  if (image.startsWith("mp:")) {
    return `https://media.discordapp.net/${image.replace("mp:", "")}`;
  }

  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`;
  }

  return undefined;
}

function getTrackFromActivity(activity: LanyardActivity): NowPlayingTrack | undefined {
  const platform = getPlatform(activity.name);

  if (!platform || !activity.details) {
    return undefined;
  }

  return {
    title: activity.details,
    artist: activity.state ?? "Unknown Artist",
    platform,
    albumCoverUrl: resolveActivityImage(activity),
    timestamps: activity.timestamps?.start 
      ? { start: activity.timestamps.start, end: activity.timestamps.end }
      : undefined
  };
}

function getSpotifyTrack(spotify?: LanyardSpotify | null): NowPlayingTrack | undefined {
  if (!spotify?.song) {
    return undefined;
  }

  return {
    title: spotify.song,
    artist: spotify.artist ?? "Unknown Artist",
    platform: "Spotify",
    albumCoverUrl: spotify.album_art_url,
    timestamps: spotify.timestamps
  };
}

export async function getNowPlaying(): Promise<NowPlayingResult> {
  const discordUserId = process.env.DISCORD_USER_ID;

  if (!discordUserId) {
    return {
      status: "error",
      message: "DISCORD_USER_ID is not configured."
    };
  }

  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`, {
      next: {
        revalidate: 30
      }
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Unable to fetch Lanyard activity."
      };
    }

    const payload = (await response.json()) as LanyardResponse;

    if (!payload.success || !payload.data) {
      return {
        status: "error",
        message: "Lanyard returned an invalid response."
      };
    }

    const spotifyTrack = getSpotifyTrack(payload.data.spotify);

    if (spotifyTrack) {
      return {
        status: "playing",
        track: spotifyTrack
      };
    }

    const activityTrack = payload.data.activities?.map(getTrackFromActivity).find(Boolean);

    if (activityTrack) {
      return {
        status: "playing",
        track: activityTrack
      };
    }

    return {
      status: "idle"
    };
  } catch {
    return {
      status: "error",
      message: "Lanyard request failed."
    };
  }
}
