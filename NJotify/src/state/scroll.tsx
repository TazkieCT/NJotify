import create from 'zustand';

const useScroll = create((set) => ({
  currentScroll: false,
  setScroll: (scroll : boolean) => set({ currentScroll: scroll }),
}));

export default useScroll;