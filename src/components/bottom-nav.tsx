"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookUser, Users, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'SOS' },
  { href: '/directory', icon: BookUser, label: 'Directory' },
  { href: '/contacts', icon: Users, label: 'Contacts' },
  { href: '/share', icon: MapPin, label: 'Share' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/80 backdrop-blur-sm shadow-t-lg">
      <div className="container mx-auto grid h-16 max-w-lg grid-cols-4 items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary',
                isActive && 'text-primary'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
