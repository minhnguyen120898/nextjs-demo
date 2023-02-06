import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';
import { MILISECONDS_PER_HOUR } from '../constants';
import { AuthService } from '../service';

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: profile,
    error,
    mutate
  } = useSWR(`/profile`, {
    dedupingInternal: MILISECONDS_PER_HOUR,
    revalidateOnFocus: false,
    ...options
  })

  async function Login(payload: string) {
    await AuthService.login(payload);
    mutate();
  }

  async function Logout() {
    await AuthService.logout();
    mutate({}, false);
  }

  return {
    profile,
    error,
    Login,
    Logout
  }
}