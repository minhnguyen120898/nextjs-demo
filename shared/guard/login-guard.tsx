
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/index";
import { useRouter } from "next/router";
import LoadingComponent from "@/core/loading";

export interface LoginGuardProps {
  children: ReactNode
}

export function App ({children}: LoginGuardProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!firstLoading && !profile?.id) {
      router.push('/login');
    }
  }, [router, profile, firstLoading])

  if (!profile?.id) {
    return <LoadingComponent />
  }

  return (
    <div>
      {children}
    </div>
  );
}
