'use client'

import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PocketBase from 'pocketbase';
import { Trash2, Edit, Upload } from 'lucide-react';
import Image from 'next/image';

// Lista de opções de redes sociais e links personalizados
const socialOptions = [
  { value: 'github', label: 'GitHub' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'email', label: 'Email' },
  { value: 'custom', label: 'Link Personalizado' },
];

export default function perfil({ user }) {
  const [profile, setProfile] = useState({
    name: user.name || '',
    username: user.username || '',
    bio: user.bio || '',
    avatarUrl: '',
  });

  const [links, setLinks] = useState(user.links ? JSON.parse(user.links) : []);
  const [currentLink, setCurrentLink] = useState({ type: '', title: '', url: '' });
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pb = new PocketBase('https://pocketbase.flecksteel.com.br');

  // Atualiza o estado do perfil com base nos inputs
  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Atualiza o estado do link atual com base nos inputs
  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentLink({ ...currentLink, [e.target.name]: e.target.value });
  };

  // Atualiza o tipo de link selecionado
  const handleLinkTypeChange = (value: string) => {
    setCurrentLink({ ...currentLink, type: value });
  };

  // Adiciona um novo link ao array de links
  const addLink = () => {
    if (currentLink.type && currentLink.title && currentLink.url) {
      setLinks([...links, currentLink]);
      setCurrentLink({ type: '', title: '', url: '' });
    }
  };

  // Remove um link pelo índice
  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  // Edita um link existente
  const editLink = (index: number) => {
    setCurrentLink(links[index]);
    removeLink(index);
  };

  // Lida com a alteração do avatar
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Lida com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      ...profile,
      links: JSON.stringify(links),
      avatar: profileImage, // Salvar o avatar atualizado
    };

    try {
      await pb.collection('users').update(user.id, updatedData);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Editar Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <div className="space-y-2 flex flex-col items-center">
                <Label htmlFor="profileImage">Foto de Perfil</Label>
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                  {profileImage ? (
                    <Image src={profileImage} alt="Avatar" layout="fill" objectFit="cover" />
                  ) : (
                    <Image src={pb.files.getUrl(user, user.avatar)} alt="Avatar" layout="fill" />
                  )}
                </div>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button type="button" variant="outline" onClick={triggerFileInput}>
                  Escolher Foto
                </Button>
              </div>

              <div className="my-4">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" value={profile.name} onChange={handleProfileChange} />
              </div>
              <div className="my-4">
                <Label htmlFor="username">Nome de Usuário</Label>
                <Input
                  id="username"
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="my-4">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea id="bio" name="bio" value={profile.bio} onChange={handleProfileChange} />
              </div>
            </div>

            <div className="my-4">
              <h3 className="text-lg font-semibold">Links</h3>
              {links.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded my-2"
                >
                  <div className="flex items-center">
                    <span>{link.title}</span>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm" onClick={() => editLink(index)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeLink(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button type="submit">Salvar Perfil</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
