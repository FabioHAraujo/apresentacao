'use client'
import { useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Instagram, Linkedin, Twitter, Mail, Link } from "lucide-react"
import styles from './estilos.scss'
import { QRCodeSVG } from "qrcode.react"

interface CartaoDigital {
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
  Link
}

export default function CartaoDigital ({ name, username, bio, avatarUrl, links }: CartaoDigital) {
  const qrRef = useRef<SVGSVGElement>(null)

  return (
    <div className={styles.animatedBackground}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-md">
          <CardHeader className="items-center text-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarUrl} alt={`${name}'s profile picture`} />
              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 text-2xl font-bold">{name}</CardTitle>
            <CardDescription className="mt-1 text-sm font-medium text-muted-foreground">
              @{username}
            </CardDescription>
            <CardDescription className="mt-2">
              {bio}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {links.map((link, index) => {
              const Icon = iconMap[link.icon]
              return (
                <Button key={index} className="w-full" variant="outline" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="mr-2 h-4 w-4" />
                    {link.title}
                  </a>
                </Button>
              )
            })}
            <Button className="w-full">Nosso Site</Button>
            <Button className="w-full">Nosso Contato</Button>
            <div className="flex justify-center items-center">
              <QRCodeSVG
                value={"http://localhost:3000/"+username}
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
  )
}
