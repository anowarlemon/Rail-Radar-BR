import type { ReactNode } from 'react';
import { BottomNav } from '@/components/bottom-nav';

export function MainLayout({ children, pageTitle }: { children: ReactNode, pageTitle: string }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center">
                <h1 className="text-xl font-bold font-headline text-foreground">{pageTitle}</h1>
            </div>
        </header>
      <main className="flex-1 container mx-auto px-4 py-6 pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
