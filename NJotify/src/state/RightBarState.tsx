import create from 'zustand';

interface RightTabState {
  isOpen: boolean;
  content: string;
  openRightTab: () => void;
  closeRightTab: () => void;
  changeContent: (content: string) => void;
}

const useRightTabStore = create<RightTabState>((set) => ({
  isOpen: true,
  content: 'song-detail',
  openRightTab: () => set({ isOpen: true }),
  closeRightTab: () => set({ isOpen: false }),
  changeContent: (content) => set({ content })
}));

export default useRightTabStore;
