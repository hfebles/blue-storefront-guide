
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, ContactMessage } from "@/types";
import { Store as StoreIcon, MessageSquare, Users, TrendingUp } from "lucide-react";

// Datos de prueba hasta que integremos Supabase
const SAMPLE_STORES = [
  {
    id: "1",
    name: "Restaurante El Rincón",
    category: "Restaurantes",
    created_at: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Moda Elegante",
    category: "Moda",
    created_at: "2023-07-05T14:20:00Z",
  },
  {
    id: "3",
    name: "TechStore",
    category: "Tecnología",
    created_at: "2023-08-12T09:15:00Z",
  }
];

const SAMPLE_MESSAGES = [
  {
    id: "1",
    name: "Juan García",
    email: "juan@example.com",
    message: "Me gustaría obtener más información sobre los planes de publicidad.",
    created_at: "2023-09-01T11:45:00Z",
    read: false,
  },
  {
    id: "2",
    name: "María López",
    email: "maria@example.com",
    message: "Tengo un negocio y me gustaría aparecer en su directorio.",
    created_at: "2023-09-03T16:30:00Z",
    read: true,
  },
];

const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) => (
  <Card className="border-directorio-100">
    <CardContent className="p-6 flex items-center space-x-4">
      <div className={`rounded-full p-3 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [recentStores, setRecentStores] = useState<Partial<Store>[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  
  useEffect(() => {
    // Aquí implementaremos la conexión con Supabase más adelante
    setRecentStores(SAMPLE_STORES);
    setRecentMessages(SAMPLE_MESSAGES);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-directorio-700">Panel de Administración</h1>
        <Button className="bg-directorio-500 hover:bg-directorio-600">
          Añadir nuevo comercio
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<StoreIcon className="h-5 w-5 text-blue-500" />}
          title="Total Comercios"
          value="125"
          color="bg-blue-100"
        />
        
        <StatCard 
          icon={<MessageSquare className="h-5 w-5 text-green-500" />}
          title="Mensajes nuevos"
          value="18"
          color="bg-green-100"
        />
        
        <StatCard 
          icon={<Users className="h-5 w-5 text-orange-500" />}
          title="Visitantes (este mes)"
          value="2,543"
          color="bg-orange-100"
        />
        
        <StatCard 
          icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
          title="Visualizaciones"
          value="12,867"
          color="bg-purple-100"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Comercios recientes */}
        <Card className="border-directorio-100">
          <CardHeader>
            <CardTitle className="text-directorio-700">Comercios recientes</CardTitle>
            <CardDescription>Últimos comercios añadidos al directorio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStores.map((store) => (
                <div key={store.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div>
                    <h3 className="font-medium text-gray-900">{store.name}</h3>
                    <p className="text-sm text-gray-500">Categoría: {store.category}</p>
                  </div>
                  <Button variant="ghost" className="text-directorio-500 hover:text-directorio-600 hover:bg-directorio-50">
                    Ver detalles
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-directorio-100 bg-directorio-50/30 flex justify-center">
            <Button variant="link" className="text-directorio-600">
              Ver todos los comercios
            </Button>
          </CardFooter>
        </Card>
        
        {/* Mensajes recientes */}
        <Card className="border-directorio-100">
          <CardHeader>
            <CardTitle className="text-directorio-700">Mensajes recientes</CardTitle>
            <CardDescription>Últimos mensajes recibidos del formulario de contacto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div>
                    <h3 className="font-medium text-gray-900 flex items-center">
                      {message.name}
                      {!message.read && (
                        <span className="ml-2 inline-block w-2 h-2 rounded-full bg-directorio-500"></span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{message.email}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{message.message}</p>
                  </div>
                  <Button variant="ghost" className="text-directorio-500 hover:text-directorio-600 hover:bg-directorio-50 flex-shrink-0">
                    Ver mensaje
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-directorio-100 bg-directorio-50/30 flex justify-center">
            <Button variant="link" className="text-directorio-600">
              Ver todos los mensajes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
