import { createClient } from '@supabase/supabase-js';
import CartaoDigital from '@/components/personal/CartaoDigital/page';

// Inicialize o cliente Supabase usando as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function generateStaticParams() {
  // Busque todos os usuários da tabela "cartoes"
  const { data: users, error } = await supabase
    .from('cartoes')
    .select('username');

  if (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }

  return users.map((user: any) => ({
    username: user.username,
  }));
}

export default async function UserPage({ params }: { params: { username: string } }) {
  // Busque os dados do usuário específico com base no "username"
  const { data: user, error } = await supabase
    .from('cartoes')
    .select('*')
    .eq('username', params.username)
    .single();

  if (error || !user) {
    return <div>User not found</div>;
  }

  return (
    <CartaoDigital
      name={user.name}
      username={user.username}
      bio={user.bio}
      avatarUrl={user.avatarurl}
      links={user.links}
    />
  );
}
