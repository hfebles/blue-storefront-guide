
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-directorio-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-directorio-600 mb-4">MiZona Comercial</h3>
            <p className="text-gray-600">
              La mejor plataforma para descubrir los comercios locales de tu zona.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-directorio-600 mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-directorio-500 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/precios" className="text-gray-600 hover:text-directorio-500 transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-600 hover:text-directorio-500 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-directorio-600 mb-4">Contacto</h3>
            <address className="not-italic text-gray-600">
              <p>Email: info@mizonacomercial.com</p>
              <p>Teléfono: (123) 456-7890</p>
            </address>
          </div>
        </div>
        <div className="border-t border-directorio-100 mt-8 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MiZona Comercial. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
