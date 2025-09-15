"use client";

import { useState } from 'react';
import { MapPin, MessageSquare, LocateFixed, Loader2, AlertTriangle, User } from 'lucide-react';
import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from '@/hooks/use-local-storage';

type Contact = {
  id: string;
  name: string;
  phone: string;
};

type LocationState = {
  latitude: number;
  longitude: number;
} | null;

export default function ShareLocationPage() {
  const [location, setLocation] = useState<LocationState>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [contacts] = useLocalStorage<Contact[]>('emergency-contacts', []);

  const handleGetLocation = () => {
    setIsLoading(true);
    setError(null);
    setLocation(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsLoading(false);
        toast({
          title: "Location Found!",
          description: "Your current location has been fetched successfully.",
        });
      },
      () => {
        setError("Unable to retrieve your location. Please ensure location services are enabled.");
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Location Error",
          description: "Could not access your location. Please check browser permissions.",
        });
      }
    );
  };
  
  const getSmsBody = () => {
      if(!location) return "";
      const mapLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      return `Emergency! My current location is: ${mapLink}`;
  }

  const handleShare = (phoneNumber = '') => {
      const body = getSmsBody();
      window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(body)}`;
  }

  return (
    <MainLayout pageTitle="Share Location">
        <div className="space-y-6">
            <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                        <LocateFixed className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="mt-4">Share Your Location</CardTitle>
                    <CardDescription>
                        Send your current location via SMS to your emergency contacts. This feature works without an internet connection.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <Button onClick={handleGetLocation} disabled={isLoading} size="lg">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Getting Location...
                            </>
                        ) : (
                            <>
                                <MapPin className="mr-2 h-5 w-5" />
                                Get My Current Location
                            </>
                        )}
                    </Button>
                    {error && (
                        <div className="flex items-center gap-2 text-destructive">
                           <AlertTriangle className="h-4 w-4" />
                           <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {location && (
                <Card>
                    <CardHeader>
                        <CardTitle>Your Location is Ready</CardTitle>
                        <CardDescription>
                            Latitude: {location.latitude.toFixed(5)}, Longitude: {location.longitude.toFixed(5)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h3 className="font-semibold">Share with a contact:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {contacts.length > 0 ? contacts.map(contact => (
                                <Button key={contact.id} variant="outline" className="justify-start p-4 h-auto" onClick={() => handleShare(contact.phone)}>
                                    <User className="mr-3 h-5 w-5 text-muted-foreground"/>
                                    <div className="text-left">
                                        <p>{contact.name}</p>
                                        <p className="text-xs text-muted-foreground font-mono">{contact.phone}</p>
                                    </div>
                                </Button>
                            )) : (
                                <p className="text-sm text-muted-foreground">No emergency contacts saved. Add some in the Contacts tab.</p>
                            )}
                        </div>
                         <h3 className="font-semibold pt-4">Or share with anyone:</h3>
                        <Button onClick={() => handleShare()} className="w-full">
                            <MessageSquare className="mr-2 h-5 w-5" />
                            Open Messaging App
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    </MainLayout>
  );
}
