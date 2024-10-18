'use client'

import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Link as LinkIcon,
  Trash2,
  Edit,
} from 'lucide-react';

// Lista de opções de redes sociais e links personalizados
const socialOptions = [
  { value: 'github', label: 'GitHub', icon: Github },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'custom', label: 'Link Personalizado', icon: LinkIcon },
];

interface Profile {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

interface Link {
  type: string;
  title: string;
  url: string;
}

export default function Home() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    username: '',
    bio: '',
    avatarUrl: '',
  });

  const [links, setLinks] = useState<Link[]>([]);
  const [currentLink, setCurrentLink] = useState<Link>({
    type: '',
    title: '',
    url: '',
  });

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

  // Lida com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile:', profile);
    console.log('Links:', links);
    // Adicione aqui a lógica para salvar o perfil e os links
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Criar cartão de visitas</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="my-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                <div className="my-2">
                  <Label htmlFor="username">Nome de usuário</Label>
                  <Input
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
              </div>
              <div className="my-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="my-4">
                <Label htmlFor="avatarUrl">URL da Imagem de Perfil</Label>
                <Input
                  id="avatarUrl"
                  name="avatarUrl"
                  value={profile.avatarUrl}
                  onChange={handleProfileChange}
                />
              </div>
            </div>
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
                  <Input
                    id="linkTitle"
                    name="title"
                    value={currentLink.title}
                    onChange={handleLinkChange}
                  />
                </div>
              </div>
              <div className="my-2">
                <Label htmlFor="linkUrl">URL do Link</Label>
                <Input
                  id="linkUrl"
                  name="url"
                  value={currentLink.url}
                  onChange={handleLinkChange}
                />
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
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-2 rounded"
                  >
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
