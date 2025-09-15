import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8">
            <Link href="/" legacyBehavior>
                <Button variant="ghost">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                </Button>
            </Link>
        </div>
        
        <h1 className="text-4xl font-bold font-headline mb-4 text-foreground">Privacy Policy for Proyojon</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground space-y-4">
          <p>
            This Privacy Policy describes Our policies and procedures on the collection,
            use and disclosure of Your information when You use the Service and tells
            You about Your privacy rights and how the law protects You.
          </p>
          <p>
            This is a placeholder privacy policy. In a real application, you would need to detail the data you collect, how you use it, and the rights of your users.
          </p>

          <h2 className="text-2xl font-bold pt-6">Interpretation and Definitions</h2>
          <h3 className="text-xl font-bold">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings defined
            under the following conditions. The following definitions shall have the same
            meaning regardless of whether they appear in singular or in plural.
          </p>

          <h2 className="text-2xl font-bold pt-6">Collecting and Using Your Personal Data</h2>
          <h3 className="text-xl font-bold">Types of Data Collected</h3>
          <h4>Personal Data</h4>
          <p>
            While using Our Service, We may ask You to provide Us with certain personally
            identifiable information that can be used to contact or identify You.
            Personally identifiable information may include, but is not limited to:
          </p>
          <ul>
            <li>Phone number</li>
            <li>Usage Data</li>
            <li>Location Data (with your consent)</li>
            <li>Emergency Contacts information (stored locally on your device)</li>
          </ul>

          <h2 className="text-2xl font-bold pt-6">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, You can contact us:
          </p>
          <ul>
            <li>By email: privacy@proyojon.example.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
