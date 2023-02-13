
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/index";
import { useRouter } from "next/router";
import LoadingComponent from "@/core/loading";

export interface LoginGuardProps {
  children: ReactNode
}

// This component is used to protect routes or pages 
// from unauthorized access by checking the user's authentication status.
export function LoginGuard ({children}: LoginGuardProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    // indicating the user is not logged in
    if (!firstLoading && !profile) {
      router.push('/login');
    }
  }, [router, profile, firstLoading])

  if (!profile) {
    return <LoadingComponent />
  }

  return (
    <div>
      {children}
    </div>
  );
}
