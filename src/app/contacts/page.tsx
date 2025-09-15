"use client";

import { useState } from 'react';
import { Plus, User, Phone, Trash2, AlertCircle } from 'lucide-react';
import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useLocalStorage from '@/hooks/use-local-storage';
import { useToast } from "@/hooks/use-toast"

type Contact = {
  id: string;
  name: string;
  phone: string;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('emergency-contacts', []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast()

  const handleSaveContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contacts.length >= 3) {
      toast({
        variant: "destructive",
        title: "Limit Reached",
        description: "You can only add up to 3 emergency contacts.",
      })
      return;
    }
    const formData = new FormData(event.currentTarget);
    const newContact: Contact = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
    };
    setContacts([...contacts, newContact]);
    setIsDialogOpen(false);
    toast({
        title: "Contact Saved",
        description: `${newContact.name} has been added to your emergency contacts.`,
    })
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
     toast({
        title: "Contact Removed",
        description: `The contact has been removed.`,
    })
  };

  return (
    <MainLayout pageTitle="Emergency Contacts">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="space-y-6">
                <Card className="border-0 shadow-none">
                <CardHeader className="p-0 flex flex-row justify-between items-center">
                    <div>
                        <CardDescription>
                            Add up to 3 personal contacts for SOS calls and location sharing.
                        </CardDescription>
                    </div>
                     <DialogTrigger asChild>
                        <Button disabled={contacts.length >= 3}>
                            <Plus className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    </DialogTrigger>
                </CardHeader>
                </Card>

                {contacts.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {contacts.map((contact) => (
                    <Card key={contact.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-muted-foreground" />
                                {contact.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <a href={`tel:${contact.phone}`} className="font-mono hover:underline">{contact.phone}</a>
                            </p>
                        </CardContent>
                        <CardContent>
                             <Button variant="ghost" size="sm" onClick={() => handleDeleteContact(contact.id)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </CardContent>
                    </Card>
                    ))}
                </div>
                ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">No Contacts Yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Add your trusted contacts for quick access in an emergency.</p>
                </div>
                )}
            </div>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
                <DialogDescription>
                    This contact will be used for SOS calls.
                </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSaveContact}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" name="name" required className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Phone
                    </Label>
                    <Input id="phone" name="phone" type="tel" required className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save Contact</Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </MainLayout>
  );
}
