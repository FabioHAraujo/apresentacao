'use server';

interface UserData {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  links: Array<{ title: string; url: string; icon: string }>;
}

async function fetchUserData(username: string): Promise<UserData | null> {
  const response = await fetch(`https://pocketbase.flecksteel.com.br/api/collections/users/records`);
  if (!response.ok) {
    throw new Error('Erro ao buscar os dados do usuário.');
  }
  const data = await response.json();
  const user = data.items.find((user: any) => user.username === username);

  if (!user) {
    return null;
  }

  return {
    name: user.name,
    username: user.username,
    bio: user.bio,
    avatarUrl: `https://pocketbase.flecksteel.com.br/api/files/_pb_users_auth_/${user.id}/${user.avatar}`, // Substitui o ID fixo por user.id
    links: user.links,
  };
}

export default async function getUserData(username: string): Promise<UserData | null> {
  return await fetchUserData(username);
}
