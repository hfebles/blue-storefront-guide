
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useSupabaseAuth();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <Card className="border-directorio-100">
          <CardHeader className="text-center">
            <div className="mx-auto bg-directorio-50 p-3 rounded-full inline-flex mb-4">
              <LockKeyhole className="h-6 w-6 text-directorio-600" />
            </div>
            <CardTitle className="text-2xl text-directorio-700">Acceso Administración</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al panel de administración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="border-directorio-200 focus-visible:ring-directorio-400"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="border-directorio-200 focus-visible:ring-directorio-400"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-directorio-500 hover:bg-directorio-600 mt-2"
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-directorio-100 bg-directorio-50/30 text-sm text-gray-600">
            <p>
              Para acceder necesitas una cuenta en el sistema.
              Contacta al administrador para obtener acceso.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
