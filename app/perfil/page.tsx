// /app/perfil/page.tsx
import EditarPerfil from "@/components/personal/EditarPerfil/page";
import { useUser } from "@/app/hooks/useUser"; // Ajuste o caminho se necessário
import Loading from '@/components/personal/Loading/page';

export default function PerfilPage() {
  const { user, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    // Aqui você pode redirecionar ou renderizar uma mensagem
    return <div>Acesso negado. Você não está logado.</div>;
  }

  return <EditarPerfil user={user} />;
}
