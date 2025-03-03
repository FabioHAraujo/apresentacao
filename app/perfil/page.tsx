'use client';

import EditarPerfil from "@/components/personal/EditarPerfil/page";
import { useUser } from "@/app/hooks/useUser";
import Loading from '@/components/personal/Loading/page';

export default function PerfilPage() {
  const { user, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <div>Acesso negado. Você não está logado.</div>;
  }

  return <EditarPerfil user={user} />;
}
