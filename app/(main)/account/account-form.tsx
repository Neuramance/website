'use client';

import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Avatar from './avatar';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { createClient } from '@/lib/supabase/client';
import { type User } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(50, {
      message: 'Name cannot be greater than 50 characters.',
    }),
});

export default function AccountForm({ user }: { user: User | null }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    updateProfile({ name: values.name });
  }

  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`name, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setName(data.name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({ name }: { name: string | null }) {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('profiles')
        .update({
          name: name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);
      if (error) throw error;
    } catch (error) {
      alert('Error updating profile!');
    } finally {
      setLoading(false);
    }
  }

  async function updateAvatar({ avatar_url }: { avatar_url: string | null }) {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('profiles')
        .update({
          avatar_url: avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);
      if (error) throw error;
    } catch (error) {
      alert('Error updating avatar!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label>Avatar</Label>
          </div>
          <Avatar
            uid={user?.id ?? null}
            url={avatar_url}
            size={78}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateAvatar({ avatar_url: url });
            }}
          />

          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Your avatar. Click on it to upload a custom one.
              <br />
              5MB maximum.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder={name || ''} {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled placeholder={user?.email || ''} />
                </FormControl>
                <FormDescription>Your verified email address.</FormDescription>
                <FormMessage />
              </FormItem>
              <div>
                <Button className="mt-4" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
