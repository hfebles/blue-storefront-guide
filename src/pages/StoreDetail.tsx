
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Store } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, ArrowLeft } from "lucide-react";
import { StoreGallery } from "@/components/stores/StoreGallery";
import { PremiumStoresBanner } from "@/components/stores/PremiumStoresBanner";
import { supabase } from "@/integrations/supabase/client";

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  
  useEffect(() => {
    const fetchStore = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('id', id)
        .single();
        
      if (!error && data) {
        setStore(data);
      }
    };
    
    fetchStore();
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
          
          {store.is_featured && (
            <div className="mt-8">
              <StoreGallery storeId={store.id} />
            </div>
          )}
          
          {/* Banner de tiendas premium */}
          <PremiumStoresBanner currentStoreId={store.id} />
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
