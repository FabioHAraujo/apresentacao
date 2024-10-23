'use client';

import { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Github, Instagram, Linkedin, Twitter, Mail, Link } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
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
    icon: keyof typeof iconMap;
  }>;
}

const iconMap = {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Link,
};

const formatIconKey = (iconKey: string | undefined) => {
  if (!iconKey) {
    console.warn('Icon key is undefined');
    return '';
  }
  return iconKey.charAt(0).toUpperCase() + iconKey.slice(1);
};

export default function CartaoDigital({
  name,
  username,
  bio,
  avatarUrl,
  links,
}: CartaoDigitalProps) {
  const qrRef = useRef<SVGSVGElement | null>(null); // Inicialize corretamente o useRef
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
              const formattedIconKey = formatIconKey(link.icon);
              const Icon = iconMap[formattedIconKey as keyof typeof iconMap]; // Corrigido o tipo

              return (
                <Button key={index} className="w-full" variant="outline" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
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
                value={`http://localhost:3000/${username}`}
                size={256}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="L"
                includeMargin={false}
                ref={qrRef} // Referência correta do QR Code
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
