
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store as StoreIcon, MessageSquare, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useStores } from "@/hooks/useStores";
import { useContactMessages } from "@/hooks/useContactMessages";

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
  const { stores, isLoading: storesLoading } = useStores();
  const { messages, isLoading: messagesLoading } = useContactMessages();
  
  // Calcular mensajes no leídos
  const unreadMessages = messages.filter(message => !message.read).length;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-directorio-700">Panel de Administración</h1>
        <Link to="/admin/stores/new">
          <Button className="bg-directorio-500 hover:bg-directorio-600">
            Añadir nuevo comercio
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<StoreIcon className="h-5 w-5 text-blue-500" />}
          title="Total Comercios"
          value={storesLoading ? "..." : stores.length.toString()}
          color="bg-blue-100"
        />
        
        <StatCard 
          icon={<MessageSquare className="h-5 w-5 text-green-500" />}
          title="Mensajes nuevos"
          value={messagesLoading ? "..." : unreadMessages.toString()}
          color="bg-green-100"
        />
        
        <StatCard 
          icon={<Users className="h-5 w-5 text-orange-500" />}
          title="Visitantes (este mes)"
          value="--"
          color="bg-orange-100"
        />
        
        <StatCard 
          icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
          title="Visualizaciones"
          value="--"
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
            {storesLoading ? (
              <div className="text-center py-4">Cargando comercios...</div>
            ) : stores.length > 0 ? (
              <div className="space-y-4">
                {stores.slice(0, 5).map((store) => (
                  <div key={store.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div>
                      <h3 className="font-medium text-gray-900">{store.name}</h3>
                      <p className="text-sm text-gray-500">Categoría: {store.category}</p>
                    </div>
                    <Link to={`/admin/stores/${store.id}`}>
                      <Button variant="ghost" className="text-directorio-500 hover:text-directorio-600 hover:bg-directorio-50">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">No hay comercios todavía</div>
            )}
          </CardContent>
          <CardFooter className="border-t border-directorio-100 bg-directorio-50/30 flex justify-center">
            <Link to="/admin/stores">
              <Button variant="link" className="text-directorio-600">
                Ver todos los comercios
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Mensajes recientes */}
        <Card className="border-directorio-100">
          <CardHeader>
            <CardTitle className="text-directorio-700">Mensajes recientes</CardTitle>
            <CardDescription>Últimos mensajes recibidos del formulario de contacto</CardDescription>
          </CardHeader>
          <CardContent>
            {messagesLoading ? (
              <div className="text-center py-4">Cargando mensajes...</div>
            ) : messages.length > 0 ? (
              <div className="space-y-4">
                {messages.slice(0, 5).map((message) => (
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
                    <Link to={`/admin/messages/${message.id}`}>
                      <Button variant="ghost" className="text-directorio-500 hover:text-directorio-600 hover:bg-directorio-50 flex-shrink-0">
                        Ver mensaje
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">No hay mensajes todavía</div>
            )}
          </CardContent>
          <CardFooter className="border-t border-directorio-100 bg-directorio-50/30 flex justify-center">
            <Link to="/admin/messages">
              <Button variant="link" className="text-directorio-600">
                Ver todos los mensajes
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
