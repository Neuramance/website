'use client';
import { createClient } from '@/lib/supabase/client';
import { logError } from '@/lib/utils/logger';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      const supabase = createClient();
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        logError('Error downloading image', error, 'Avatar');
      }
    }

    if (url) downloadImage(url);
  }, [url]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label
        htmlFor="single"
        className="cursor-pointer"
        style={{ width: size, height: size }}
      >
        {avatarUrl ? (
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full border border-[#2f3336]"
            style={{ width: size, height: size, display: 'block' }} // Ensure the image fills the label
          />
        ) : (
          <Image
            width={size}
            height={size}
            src="/fallback-avatar.png"
            alt="Default avatar"
            className="rounded-full border border-[#2f3336]"
            style={{ width: size, height: size, display: 'block' }}
          />
        )}
      </label>
      <div style={{ width: size }}>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
