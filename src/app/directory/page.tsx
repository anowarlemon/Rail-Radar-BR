import { MainLayout } from '@/components/main-layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { directoryData } from '@/lib/data';
import { Phone } from 'lucide-react';

export default function DirectoryPage() {
  return (
    <MainLayout pageTitle="Emergency Directory">
      <div className="space-y-6">
        <Card className="border-0 shadow-none">
          <CardHeader className="p-0">
            <CardDescription>
              A list of important national helplines and emergency services in Bangladesh. Tap to call.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
          {directoryData.map((group, index) => (
            <AccordionItem key={group.category} value={`item-${index}`} className="border rounded-lg bg-card shadow-sm">
              <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                {group.category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="divide-y">
                  {group.contacts.map((contact) => (
                    <div key={contact.name} className="flex items-center justify-between p-4">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{contact.number}</p>
                      </div>
                      <a href={`tel:${contact.number}`}>
                        <Button size="icon" variant="outline">
                          <Phone className="h-5 w-5" />
                          <span className="sr-only">Call {contact.name}</span>
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </MainLayout>
  );
}
