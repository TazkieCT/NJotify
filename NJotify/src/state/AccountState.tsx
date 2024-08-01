import { create } from 'zustand';

interface User {
  Id: string;
  Username: string;
  Email: string;
  Gender: string;
  Dob: string;
  Country: string;
  Role: string;
  Profile: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {
    Id: '',
    Username: '',
    Email: '',
    Gender: '',
    Dob: '',
    Country: '',
    Role: '',
    Profile: '',
  },
  setUser: (user) => set({ user : user }),
}));

export default useUserStore;
