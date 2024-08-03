import create from "zustand";

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  setCurrentTrack: (track: Track) => void;
  addQueue: (track: Track) => void;
  removeQueue: (track_id: string) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  queue: [],
  setCurrentTrack: (track) => set({ currentTrack: track }),
  addQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
  removeQueue: (track_id) => set((state) => ({
    queue: state.queue.filter((track) => track.track_id !== track_id),
  })),
}));