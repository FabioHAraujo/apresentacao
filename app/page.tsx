'use client'

import { useEffect, useState } from 'react';
import LoginScreen from '@/components/personal/Login/page';   // Componente da tela de login
import PocketBase from 'pocketbase';
import EditarPerfil from '@/components/personal/EditarPerfil/page';

export default function Home() {
  const [user, setUser] = useState(null);
  const pb = new PocketBase('https://pocketbase.flecksteel.com.br');

  useEffect(() => {
    const authData = pb.authStore.isValid ? pb.authStore.model : null;
    setUser(authData);  // Define o usuário logado se estiver autenticado
  }, [pb.authStore.isValid]);

  if (!user) {
    // Renderiza a tela de login se não houver um usuário autenticado
    return <LoginScreen />;
  }

  // Renderiza a tela de edição de perfil se o usuário estiver autenticado
  return <EditarPerfil user={user} />;
}
