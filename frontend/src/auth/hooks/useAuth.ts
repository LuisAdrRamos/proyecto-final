import { useAuthStore } from '../store/auth.store';

export function useAuth() {
  const token = useAuthStore(state => state.token);
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);
  return { token, login, logout };
}
