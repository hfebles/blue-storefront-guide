
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-directorio-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-directorio-600">MiZona</span>
          <span className="text-directorio-400">Comercial</span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-directorio-500 transition-colors">
            Inicio
          </Link>
          <Link to="/precios" className="text-gray-700 hover:text-directorio-500 transition-colors">
            Precios
          </Link>
          <Link to="/contacto" className="text-gray-700 hover:text-directorio-500 transition-colors">
            Contacto
          </Link>
          <Link to="/admin">
            <Button variant="outline" className="border-directorio-300 text-directorio-600 hover:bg-directorio-50">
              Área Admin
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
