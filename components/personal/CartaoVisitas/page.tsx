'use client'

import { useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { QRCodeSVG } from "qrcode.react"

interface CartaoVisitas {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
}

export default function CartaoVisitas({ name, username, bio, avatarUrl }: CartaoVisitas) {
  const qrRef = useRef<SVGSVGElement>(null)

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 p-4">
      <Card className="w-full max-w-4xl aspect-video bg-white shadow-lg overflow-hidden">
        <CardContent className="p-0 flex h-full">
          {/* Lado esquerdo com informações */}
          <div className="flex flex-col justify-center p-8 w-2/3">
            <div className="flex items-center space-x-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={avatarUrl} alt={`${name}'s profile picture`} />
                <AvatarFallback className="text-4xl">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-4xl font-bold leading-tight mb-2">{name}</h2>
                <p className="text-xl text-gray-500">@{username}</p>
              </div>
            </div>
            <p className="mt-6 text-xl leading-relaxed">{bio}</p>
          </div>
          
          {/* Lado direito com QR Code */}
          <div className="w-1/3 bg-gray-100 flex items-center justify-center">
            <QRCodeSVG
              value={`http://apresentacao.flecksteel.com.br/${username}`}
              size={200}
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
  )
}