'use client';

import { useEffect, useState } from 'react';
import getUserData from './UserData';
import CartaoDigital from '@/components/personal/CartaoDigital/page';

export default function UserPage({ params }: { params: { username: string } }) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserData(params.username);
      setUserData(data);
      setLoading(false);
    }

    fetchData();
  }, [params.username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <CartaoDigital
      name={userData.name}
      username={userData.username}
      bio={userData.bio}
      avatarUrl={userData.avatarUrl}
      links={userData.links}
    />
  );
}
