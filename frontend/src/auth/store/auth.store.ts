import { create } from 'zustand';
import { getToken, setToken, removeToken } from '../../utils/storage';

type AuthStore = {
  token: string | null;
  login: (t: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: getToken(),
  login: (t) => {
    setToken(t);
    set({ token: t });
  },
  logout: () => {
    removeToken();
    set({ token: null });
  },
}));
