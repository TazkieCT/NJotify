import { create } from 'zustand';

interface Cookie {
  cookie: string;
  setCookie: (cookie: string) => void;
}

const useCookie = create<Cookie>((set) => ({
  cookie: '',
  setCookie: (cookie) => set({ cookie : cookie }),
}));

export default useCookie;
