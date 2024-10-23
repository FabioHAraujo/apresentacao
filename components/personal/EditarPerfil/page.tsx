'use client';

import { useState, ChangeEvent, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PocketBase from 'pocketbase';
import { Trash2, Edit } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Github, Twitter, Linkedin, Instagram, Mail, Link } from 'lucide-react';

// Lista de opções de redes sociais e links personalizados
const socialOptions = [
  { value: 'github', label: 'GitHub', icon: Github },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'custom', label: 'Link Personalizado', icon: Link },
];

export default function EditarPerfil({ user }: { user: any }) {
  const [profile, setProfile] = useState({
    name: user.name || '',
    username: user.username || '',
    bio: user.bio || '',
    avatarUrl: '',
  });

  console.log("OBJETO DO PERFIL:", profile);

  const [links, setLinks] = useState(() => {
    return user.links && Array.isArray(user.links) ? user.links : [];
  });
  

  const [currentLink, setCurrentLink] = useState({ type: '', title: '', url: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null); // Para a prévia
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

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
      setProfileImageFile(file); // Armazena o arquivo para upload posterior

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // Mostra a prévia da imagem
      };
      reader.readAsDataURL(file); // Converte a imagem para base64 para pré-visualização
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Lida com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData: any = {};
    if (profile.name !== user.name) updatedData.name = profile.name;
    if (profile.username !== user.username) updatedData.username = profile.username;
    if (profile.bio !== user.bio) updatedData.bio = profile.bio;
    if (links.length > 0 && JSON.stringify(links) !== user.links) {
      updatedData.links = JSON.stringify(links);
    }

    try {
      // Atualiza os dados do perfil
      await pb.collection('users').update(user.id, updatedData);

      // Se houver um novo arquivo de avatar, faz upload
      if (profileImageFile) {
        const formData = new FormData();
        formData.append('avatar', profileImageFile);

        await pb.collection('users').update(user.id, formData);
      }

      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      alert('Ocorreu um erro ao atualizar o perfil.');
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
              <div className="my-2 flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                  {profileImage ? (
                    <Image src={profileImage} alt="Avatar" layout="fill" objectFit="cover" />
                  ) : (
                    <Image src={pb.files.getUrl(user, user.avatar)} alt="Avatar" layout="fill" objectFit="cover" />
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
                <Input id="username" name="username" value={profile.username} onChange={handleProfileChange} />
              </div>
              <div className="my-4">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea id="bio" name="bio" value={profile.bio} onChange={handleProfileChange} />
              </div>
            </div>

            {/* Adição de Links */}
            <div className="my-4">
              <h3 className="text-lg font-semibold">Adicionar Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="my-2">
                  <Label htmlFor="linkType">Tipo de Link</Label>
                  <Select value={currentLink.type} onValueChange={handleLinkTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {socialOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            <option.icon className="mr-2 h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="my-2">
                  <Label htmlFor="linkTitle">Título do Link</Label>
                  <Input id="linkTitle" name="title" value={currentLink.title} onChange={handleLinkChange} />
                </div>
              </div>
              <div className="my-2">
                <Label htmlFor="linkUrl">URL do Link</Label>
                <Input id="linkUrl" name="url" value={currentLink.url} onChange={handleLinkChange} />
              </div>
              <Button type="button" onClick={addLink}>
                Adicionar Link
              </Button>
            </div>

            <div className="my-4">
              <h3 className="text-lg font-semibold">Links Adicionados</h3>
              {links.map((link, index) => {
                const Icon = socialOptions.find((option) => option.value === link.type)?.icon;

                return (
                  <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <div className="flex items-center space-x-2">
                      {Icon && <Icon className="h-4 w-4" />}
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
                );
              })}
            </div>

            <Button type="submit">Salvar Perfil</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
