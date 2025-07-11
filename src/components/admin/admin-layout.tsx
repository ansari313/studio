'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // This effect should only run on the client side
    if (typeof window !== 'undefined') {
      const checkAuth = () => {
        // In a real app, you would verify a server-side session.
        // We check localStorage for our simulated session.
        const auth = localStorage.getItem('folioflow_auth');
        if (auth !== 'true') {
          router.replace('/admin/login');
        } else {
          setIsVerified(true);
        }
      };
      checkAuth();
    }
  }, [router]);

  if (!isVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return <>{children}</>;
}
