import { create } from 'zustand';

interface UserStore {
  search: string;
  setSearch: (search: string) => void;
}

const useSearchStore = create<UserStore>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));

export default useSearchStore;
