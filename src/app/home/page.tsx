'use client';
import Link from 'next/link';
import { Phone, BookUser, Users, MapPin, HeartPulse, ChevronRight } from 'lucide-react';
import { MainLayout } from '@/components/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const quickAccessItems = [
    {
        title: "Emergency Directory",
        description: "Police, Fire, Ambulance",
        icon: BookUser,
        href: "/directory"
    },
    {
        title: "My Contacts",
        description: "Call your saved contacts",
        icon: Users,
        href: "/contacts"
    },
    {
        title: "Share Location",
        description: "Send your location via SMS",
        icon: MapPin,
        href: "/share"
    },
]

export default function HomePage() {
  const handleSosClick = () => {
    // In a real app, this would get the primary emergency contact or 999
    window.location.href = 'tel:999';
  };

  return (
    <MainLayout pageTitle="Home">
        <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative flex items-center justify-center w-64 h-64">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping-slow"></div>
                <div className="absolute inset-2 bg-primary/30 rounded-full animate-ping-slow [animation-delay:-0.5s]"></div>
                <Button 
                    onClick={handleSosClick}
                    className="relative z-10 h-48 w-48 rounded-full bg-primary text-primary-foreground shadow-2xl hover:bg-primary/90 focus:ring-4 focus:ring-primary/50 flex flex-col transition-transform duration-200 active:scale-95"
                    aria-label="SOS Emergency Button"
                >
                    <HeartPulse className="h-20 w-20" />
                    <span className="mt-2 text-3xl font-bold tracking-wider font-headline">SOS</span>
                </Button>
            </div>

            <div className="text-center">
                <p className="text-lg font-semibold text-foreground">In case of emergency, press the button.</p>
                <p className="text-muted-foreground">This will call the national emergency number (999).</p>
            </div>

            <div className="w-full max-w-md pt-4">
                <h2 className="text-lg font-semibold text-left mb-4">Quick Access</h2>
                <div className="grid grid-cols-1 gap-4">
                    {quickAccessItems.map(item => (
                         <Link href={item.href} key={item.title}>
                            <Card className="hover:bg-secondary/50 transition-colors cursor-pointer group">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-primary/10 p-3 rounded-full">
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{item.title}</p>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform"/>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        <style jsx>{`
            @keyframes ping-slow {
                75%, 100% {
                    transform: scale(1.5);
                    opacity: 0;
                }
            }
            .animate-ping-slow {
                animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
            }
        `}</style>
    </MainLayout>
  );
}
