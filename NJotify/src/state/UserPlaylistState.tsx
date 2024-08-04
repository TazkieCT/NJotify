import { create } from 'zustand'

type State = {
  playlists: playlist[] | null
}

type Action = {
  setPlaylists: (setting: State['playlists']) => void
}

const usePlaylistStore = create<State & Action>((set) => ({
  playlists: null,
  setPlaylists: (playlists) => set(() => ({ playlists })),
}))

export default usePlaylistStore