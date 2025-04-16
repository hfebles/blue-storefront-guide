import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Store } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, ArrowLeft } from "lucide-react";

// Datos de muestra hasta que integremos Supabase
const SAMPLE_STORES: Store[] = [
  {
    id: "1",
    name: "Restaurante El Rincón",
    description: "Comida tradicional casera con ingredientes locales y de temporada. Ofrecemos un menú diario variado con platos tradicionales y nuestras especialidades de fin de semana incluyen paellas y asados. Contamos con espacio para eventos y celebraciones familiares. Nuestro chef tiene más de 20 años de experiencia en la cocina mediterránea.",
    phone: "123-456-7890",
    address: "Calle Principal 123",
    logo: "https://placehold.co/400x300?text=Restaurante+El+Rincón",
    category: "Restaurantes",
    latitude: 40.4167,
    longitude: -3.7033,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Moda Elegante",
    description: "Boutique de ropa con las últimas tendencias. Moda para hombre y mujer con prendas exclusivas importadas. Trabajamos con diseñadores nacionales e internacionales para traerte lo mejor de la moda. Ofrecemos servicio de sastrería y asesoramiento personalizado para encontrar el estilo que mejor se adapte a ti.",
    phone: "123-456-7891",
    address: "Av. de la Moda 456",
    logo: "https://placehold.co/400x300?text=Moda+Elegante",
    category: "Moda",
    latitude: 40.4160,
    longitude: -3.7040,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "TechStore",
    description: "Tienda de dispositivos electrónicos, reparaciones y accesorios. Servicio técnico especializado y garantía extendida. Somos distribuidores oficiales de las principales marcas de tecnología. Ofrecemos instalación y configuración de equipos a domicilio, así como cursos básicos para aprender a utilizar tus dispositivos.",
    phone: "123-456-7892",
    address: "Plaza Tecnología 789",
    logo: "https://placehold.co/400x300?text=TechStore",
    category: "Tecnología",
    latitude: 40.4155,
    longitude: -3.7050,
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    name: "Farmacia Salud Total",
    description: "Medicamentos, productos de cuidado personal y asesoramiento farmacéutico. Servicio 24 horas y entregas a domicilio. Realizamos seguimiento farmacoterapéutico y disponemos de una amplia gama de productos de parafarmacia y cosmética. Nuestro personal está formado para brindar el mejor consejo sanitario.",
    phone: "123-456-7893",
    address: "Av. Bienestar 101",
    logo: "https://placehold.co/400x300?text=Farmacia+Salud+Total",
    category: "Salud",
    latitude: 40.4145,
    longitude: -3.7060,
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    name: "Muebles Confort",
    description: "Mobiliario para el hogar, diseño moderno y tradicional. Fabricación personalizada y entrega en toda la ciudad. Trabajamos con los mejores materiales y ofrecemos asesoramiento de decoración gratuito. Disponemos de taller propio para personalizar cualquier mueble según tus necesidades y espacio.",
    phone: "123-456-7894",
    address: "Calle Industrial 202",
    logo: "https://placehold.co/400x300?text=Muebles+Confort",
    category: "Hogar",
    latitude: 40.4135,
    longitude: -3.7070,
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    name: "Limpieza Express",
    description: "Servicio de limpieza para hogares y oficinas. Planes semanales, quincenales o por evento con personal capacitado. Utilizamos productos ecológicos y disponemos de equipos profesionales para todo tipo de superficies. Ofrecemos presupuestos sin compromiso y flexibilidad horaria para adaptarnos a tus necesidades.",
    phone: "123-456-7895",
    address: "Paseo del Servicio 303",
    logo: "https://placehold.co/400x300?text=Limpieza+Express",
    category: "Servicios",
    latitude: 40.4125,
    longitude: -3.7080,
    created_at: new Date().toISOString()
  },
];

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  
  useEffect(() => {
    // Aquí implementaremos la conexión con Supabase más adelante
    const foundStore = SAMPLE_STORES.find(s => s.id === id);
    setStore(foundStore || null);
  }, [id]);
  
  if (!store) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Tienda no encontrada</h2>
        <p className="mt-4 text-gray-600">La tienda que buscas no existe o ha sido eliminada</p>
        <Link to="/" className="mt-6 inline-block">
          <Button className="bg-directorio-500 hover:bg-directorio-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-directorio-600 hover:text-directorio-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Volver a listado
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="overflow-hidden border-directorio-100">
            <div className="h-64 bg-directorio-50 flex items-center justify-center p-8 border-b border-directorio-100">
              <img 
                src={store.logo} 
                alt={`Logo de ${store.name}`} 
                className="h-full object-contain"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-directorio-50 text-directorio-600 text-sm px-3 py-1 rounded-full">
                  {store.category}
                </div>
              </div>
              <h1 className="text-3xl font-bold text-directorio-800 mb-4">{store.name}</h1>
              <p className="text-gray-700 mb-6 whitespace-pre-line">{store.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Phone size={18} className="mr-3 text-directorio-500" />
                  <span>{store.phone}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <MapPin size={18} className="mr-3 text-directorio-500" />
                  <span>{store.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border-directorio-100 sticky top-24">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-directorio-700 mb-4">Contactar con {store.name}</h3>
              
              <div className="space-y-4">
                <a href={`tel:${store.phone}`} className="block">
                  <Button className="w-full bg-directorio-500 hover:bg-directorio-600">
                    <Phone className="mr-2 h-4 w-4" /> Llamar
                  </Button>
                </a>
                
                {store.latitude && store.longitude && (
                  <a 
                    href={`https://www.google.com/maps?q=${store.latitude},${store.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full border-directorio-200">
                      <MapPin className="mr-2 h-4 w-4" /> Ver en el mapa
                    </Button>
                  </a>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-directorio-100">
                <h4 className="font-medium text-gray-700 mb-2">¿Tienes alguna pregunta?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Contacta con nosotros y resolveremos tus dudas sobre este comercio
                </p>
                <Link to="/contacto">
                  <Button variant="link" className="p-0 text-directorio-500 hover:text-directorio-600">
                    Ir al formulario de contacto →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
