'use client';

import { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Github, Instagram, Linkedin, Twitter, Mail, Link, CopyIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import './estilos.css';
import CartaoVisitas from '../CartaoVisitas/page';

interface CartaoDigitalProps {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  links: Array<{
    title: string;
    url: string;
    type: string;  // Agora estamos usando 'type' como no banco de dados
  }>;
}

// Mapeamento dos ícones
const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  email: Mail,
  custom: Link,
};

// Função para garantir que o 'type' esteja no formato correto para o mapeamento
const getIconComponent = (type: string) => {
  const lowerType = type.toLowerCase(); // Converte para minúsculas para garantir compatibilidade
  return iconMap[lowerType as keyof typeof iconMap] || iconMap.custom;
};

export default function CartaoDigital({
  name,
  username,
  bio,
  avatarUrl,
  links,
}: CartaoDigitalProps) {
  const qrRef = useRef<SVGSVGElement | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log("Link Avatar:", avatarUrl)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('E-mail copiado para a área de transferência!');
    }).catch(err => {
      console.error('Falha ao copiar e-mail. Relate isto para: informatica@flecksteel.com.br: ', err);
    });
  };

  return (
    <div className="animatedBackground">
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-md">
          <CardHeader className="items-center text-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl} alt={`${name}'s profile picture`} className="object-cover" />
              <AvatarFallback>{name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-2xl font-bold">{name}</CardTitle>
            <CardDescription className="mt-1 text-sm font-medium text-muted-foreground">
              @{username}
            </CardDescription>
            <CardDescription className="mt-2">{bio}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {links.map((link, index) => {
              const Icon = getIconComponent(link.type);  // Usa a função para obter o ícone correto
              console.log("Ícone:", Icon, "Tipo:", link.type);

              if (link.type === 'email') {  // Verifica se o tipo é 'email'
                return (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        {Icon && <Icon className="mr-2 h-4 w-4" />}
                        {link.title}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Endereço de E-mail</DialogTitle>
                        <DialogDescription>
                          Copie o e-mail para a área de transferência para nos contatar.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="email" className="sr-only">Email</Label>
                          <Input
                            id="email"
                            defaultValue={link.url}
                            readOnly
                          />
                        </div>
                        <Button 
                          type="button" 
                          size="sm" 
                          className="px-3"
                          onClick={() => copyToClipboard(link.url)}
                        >
                          <span className="sr-only">Copy</span>
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Fechar
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                );
              }

              return (
                <Button key={index} className="w-full" variant="outline" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {link.title}
                  </a>
                </Button>
              );
            })}

            <Button className="w-full">Nosso Site</Button>
            <Button className="w-full">Nosso Contato</Button>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button className="w-full">Visualizar Cartão de Visitas</Button>
              </DrawerTrigger>
              <DrawerContent className="h-[60vh]">
                <div className="mx-auto w-full">
                  <CartaoVisitas name={name} username={username} bio={bio} avatarUrl={avatarUrl} />
                </div>
              </DrawerContent>
            </Drawer>

            <div className="flex justify-center items-center">
              <QRCodeSVG
                value={`http://apresentacao.flecksteel.com.br/${username}`}
                size={256}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="L"
                includeMargin={false}
                ref={qrRef}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
