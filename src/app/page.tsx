import Link from 'next/link';
import { Smartphone, Mail, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
            <Icons.logo className="mx-auto h-12 w-auto text-primary" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground font-headline">
              Welcome to Proyojon
            </h1>
            <p className="mt-2 text-muted-foreground">Your trusted partner in emergencies.</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your phone number to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="phone" type="tel" placeholder="+8801..." required className="pl-10"/>
              </div>
            </div>
            
            <Link href="/home" className="w-full">
                <Button className="w-full" >
                    Continue
                </Button>
            </Link>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Mail className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="flex-col items-start gap-4 text-sm">
             <div className="flex items-start space-x-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-900/50 dark:bg-yellow-900/20">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-500" />
              <p className="text-muted-foreground">
                For security, the app requires the phone number to match the SIM card in your device after login.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
