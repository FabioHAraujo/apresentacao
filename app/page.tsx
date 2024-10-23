'use client';

import { useUser } from '@/app/hooks/useUser'; // Ajuste o caminho se necessário
import LoginScreen from '@/components/personal/Login/page'; // Componente da tela de login
import EditarPerfil from '@/components/personal/EditarPerfil/page';
import Loading from '@/components/personal/Loading/page';

export default function Home() {
  const { user, loading } = useUser(); // Usando o hook para obter o usuário e o estado de carregamento

  if (loading) {
    // Renderiza o componente de loading enquanto verifica a autenticação
    return <Loading />;
  }

  if (!user) {
    // Renderiza a tela de login se não houver um usuário autenticado
    return <LoginScreen />;
  }

  // Renderiza a tela de edição de perfil se o usuário estiver autenticado
  return <EditarPerfil user={user} />;
}
