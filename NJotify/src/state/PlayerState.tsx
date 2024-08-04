import create from "zustand";

interface PlayerState {
  currentTrack: trackInfo | null;
  queue: trackInfo[];
  songsPlayed: number;
  isAdPlaying: boolean;
  setQueue: (newQueue: trackInfo[]) => void;
  setCurrentTrack: (track: trackInfo) => void;
  skipToNextTrack: () => void;
  skipToPreviousTrack: () => void;
  removeTrackFromQueue: (trackId: string) => void;
  incrementSongsPlayed: () => void;
  setAdPlaying: (isPlaying: boolean) => void;
  clearQueue: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  songsPlayed: 0,
  isAdPlaying: false,
  setQueue: (newQueue) => set(() => ({
    queue: newQueue
  })),
  setCurrentTrack: (track) => set(() => ({
    currentTrack: track
  })),
  skipToNextTrack: () => {
    const { queue, currentTrack, songsPlayed, isAdPlaying } = get();
    if (isAdPlaying) return;

    const currentTrackIndex = queue.findIndex(track => track.track_id === currentTrack?.track_id);
    if (currentTrackIndex >= 0 && currentTrackIndex < queue.length - 1) {
      const nextTrack = queue[currentTrackIndex + 1];
      const newSongsPlayed = songsPlayed + 1;

      if (newSongsPlayed % 5 === 0) {
        const adTrack: trackInfo = {
          track_id: 'ad',
          track_name: 'Advertisement',
          track_file: 'public\\tracks\\20240730232927_five-nights-at-freddys-beatbox-made-with-Voicemod-technology.mp3',
          track_album_id: 'ad-album',
          track_duration: 0,
          track_count: 0
        };
        set({
          queue: [...queue.slice(0, currentTrackIndex + 1), adTrack, ...queue.slice(currentTrackIndex + 1)],
          songsPlayed: newSongsPlayed,
          isAdPlaying: true
        });
      } else {
        set({
          songsPlayed: newSongsPlayed
        });
      }
      
      set({ currentTrack: nextTrack });
    }
  },
  clearQueue: () => set({ queue: [] }),
  skipToPreviousTrack: () => {
    const { queue, currentTrack, isAdPlaying } = get();
    if (isAdPlaying) return;

    const currentTrackIndex = queue.findIndex(track => track.track_id === currentTrack?.track_id);
    if (currentTrackIndex > 0) {
      set({ currentTrack: queue[currentTrackIndex - 1] });
    }
  },
  removeTrackFromQueue: trackId => set(state => ({
    queue: state.queue.filter(track => track.track_id !== trackId),
  })),
  incrementSongsPlayed: () => set(state => ({
    songsPlayed: state.songsPlayed + 1
  })),
  setAdPlaying: (isPlaying) => set({ isAdPlaying: isPlaying })
}));
