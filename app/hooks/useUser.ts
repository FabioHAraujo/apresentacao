// /app/hooks/useUser.ts
'use client';

import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.flecksteel.com.br');

interface Link {
  type: string;
  title: string;
  url: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  username: string; // Adicione estas propriedades
  bio: string;
  avatar?: string;
  avatarUrl?: string;
  links: Link[]; // Adicione esta propriedade
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authData = pb.authStore.isValid ? (pb.authStore.model as User) : null;
    setUser(authData);
    setLoading(false);
  }, []);

  return { user, loading };
};
