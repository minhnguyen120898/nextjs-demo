
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/index";
import { useRouter } from "next/router";
import LoadingComponent from "@/core/loading";

export interface LoginGuardProps {
  children: ReactNode
}

<<<<<<< Updated upstream
export function App ({children}: LoginGuardProps) {
=======
// This component is used to protect routes or pages 
// from unauthorized access by checking the user's authentication status.
export function LoginGuard ({children}: LoginGuardProps) {
>>>>>>> Stashed changes
  const router = useRouter();
  const { profile, firstLoading } = useAuth();

  useEffect(() => {
<<<<<<< Updated upstream
    if (!firstLoading && !profile?.id) {
=======
    // indicating the user is not logged in
    if (!firstLoading && !profile) {
>>>>>>> Stashed changes
      router.push('/login');
    }
  }, [router, profile, firstLoading])

<<<<<<< Updated upstream
  if (!profile?.id) {
=======
  if (!profile) {
>>>>>>> Stashed changes
    return <LoadingComponent />
  }

  return (
    <div>
      {children}
    </div>
  );
}
