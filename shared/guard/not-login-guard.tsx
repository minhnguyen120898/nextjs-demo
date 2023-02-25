
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/index";
import { useRouter } from "next/router";

export interface NotLoginGuardProps {
  children: ReactNode
}

// This component is used to protect routes or pages 
// from unauthorized access by checking the user's authentication status.
export function NotLoginGuard ({children}: NotLoginGuardProps) {
  const router = useRouter();
  const { profile, firstLoading } = useAuth({
    revalidateOnMount: false
  });

  useEffect(() => {
    if (!firstLoading && profile) {
      router.push('/');
    }
  }, [router, profile, firstLoading])

  return (
    <div>
      {children}
    </div>
  );
}
