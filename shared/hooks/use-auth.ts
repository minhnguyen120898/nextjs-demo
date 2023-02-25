import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';
import { MILISECONDS_PER_HOUR } from '../constants';
import { AuthService } from '../service';

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate
  } = useSWR(`profile`, {
    dedupingInternal: MILISECONDS_PER_HOUR,
    revalidateOnFocus: false,
    ...options
  })

  const firstLoading = profile === undefined && error === undefined;

  async function login(payload: string) {
    const response = await AuthService.login(payload);
    mutate();
    return response;
  }

  async function logout() {
    await AuthService.logout();
    mutate({}, false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  return {
    profile,
    error,
    firstLoading,
    login,
    logout
  }
}