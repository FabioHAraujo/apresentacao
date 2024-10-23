// /app/hooks/useUser.ts
'use client'; // Certifique-se de que é um componente de cliente

import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.flecksteel.com.br');

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = pb.authStore.isValid ? pb.authStore.model : null;
    setUser(authData);
    setLoading(false);
  }, []);

  return { user, loading };
};
