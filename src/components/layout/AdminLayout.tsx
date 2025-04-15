
import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Store, MessageSquare, Settings, LogOut, Home, PlusCircle, Users, ShoppingBag } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

const AdminLayout = () => {
  const { user, loading, logout } = useSupabaseAuth();
  const location = useLocation();
  
  // Redirigir a la página de inicio de sesión si el usuario no está autenticado
  if (!loading && !user) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }
  
  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-directorio-100 h-screen sticky top-0">
          <div className="flex items-center justify-between p-4 border-b border-directorio-100">
            <div>
              <div className="text-lg font-bold text-directorio-700">MiZona</div>
              <div className="text-xs text-directorio-400">Panel de Administración</div>
            </div>
          </div>
          
          <nav className="p-4">
            <div className="space-y-1">
              <Link to="/admin/dashboard" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-directorio-50 hover:text-directorio-600">
                <Home className="h-4 w-4 mr-3" />
                Dashboard
              </Link>
              
              <div className="pt-4 pb-2">
                <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Comercios
                </div>
              </div>
              
              <Link to="/admin/stores" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-directorio-50 hover:text-directorio-600">
                <Store className="h-4 w-4 mr-3" />
                Ver todos
              </Link>
              
              <Link to="/admin/stores/new" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-directorio-50 hover:text-directorio-600">
                <PlusCircle className="h-4 w-4 mr-3" />
                Añadir nuevo
              </Link>
              
              <Link to="/admin/categories" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-directorio-50 hover:text-directorio-600">
                <ShoppingBag className="h-4 w-4 mr-3" />
                Categorías
              </Link>
              
              <div className="pt-4 pb-2">
                <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Comunicaciones
                </div>
              </div>
              
              <Link to="/admin/messages" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-directorio-50 hover:text-directorio-600">
                <MessageSquare className="h-4 w-4 mr-3" />
                Mensajes
              </Link>
              
              <Link to="/admin/users" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-directorio-50 hover:text-directorio-600">
                <Users className="h-4 w-4 mr-3" />
                Usuarios
              </Link>
              
              <div className="pt-4 pb-2">
                <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Configuración
                </div>
              </div>
              
              <Link to="/admin/settings" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-directorio-50 hover:text-directorio-600">
                <Settings className="h-4 w-4 mr-3" />
                Ajustes
              </Link>
              
              <button 
                onClick={() => logout()}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-directorio-50 hover:text-directorio-600"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Cerrar sesión
              </button>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1">
          <div className="border-b border-directorio-100 bg-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-directorio-700">Administración</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-directorio-600">{user.email}</span>
              <Link to="/">
                <Button variant="outline" size="sm" className="border-directorio-200">
                  Ver sitio web
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
