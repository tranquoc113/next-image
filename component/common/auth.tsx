import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface AuthProps {
  children: any;
}
export function Auth({ children }: AuthProps) {
  const { profile, firstLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!firstLoading && !profile) router.push('/login')
  }, [router, profile, firstLoading]);

  if (!profile) return <p>Loading ...</p>


  return <div>{children}</div>;
}
