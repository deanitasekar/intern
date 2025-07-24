"use client";

import { useAuth } from '@/hooks/use-auth.hook';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loadingContext } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingContext && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, loadingContext, router]);

  if (loadingContext) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <div>{children}</div>;
}