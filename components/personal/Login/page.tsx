'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase'; // Importa o PocketBase
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn } from 'lucide-react';
import Link from 'next/link'; // Importa Link para redirecionamento

// Inicializa o PocketBase
const pb = new PocketBase('https://pocketbase.flecksteel.com.br'); // Alterar URL se for necessário

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Realiza o login usando a instância do PocketBase
      const authData = await pb.collection('users').authWithPassword(email, password);

      if (authData) {
        // Sucesso no login, redireciona
        router.push('/perfil');
      }
    } catch (error) {
      console.error('Erro ao tentar logar:', error);
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm font-medium">
                Lembrar-me
              </Label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" /> Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Button variant="link" className="text-sm text-muted-foreground">
            Esqueceu sua senha?
          </Button>
          {/* Adiciona o botão de registro */}
          <Link href="/registro" passHref>
            <Button variant="link" className="text-sm text-muted-foreground">
              Não Registrado? Registre-se
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
