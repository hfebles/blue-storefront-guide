
import { useEffect, useState } from "react";
import { Store } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";

interface PremiumStoresBannerProps {
  currentStoreId?: string; // ID de la tienda actual para excluirla del carrusel
}

export const PremiumStoresBanner = ({ currentStoreId }: PremiumStoresBannerProps) => {
  const [premiumStores, setPremiumStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPremiumStores = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('stores')
          .select('*')
          .eq('is_featured', true)
          .order('featured_order', { ascending: true });
        
        // Excluir la tienda actual si se proporciona un ID
        if (currentStoreId) {
          query = query.neq('id', currentStoreId);
        }
        
        const { data, error } = await query;

        if (!error && data) {
          setPremiumStores(data);
        } else {
          console.error('Error fetching premium stores:', error);
        }
      } catch (err) {
        console.error('Error in premium stores banner:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumStores();
  }, [currentStoreId]);

  if (loading || premiumStores.length === 0) return null;

  return (
    <div className="w-full py-6 mt-8">
      <h3 className="text-xl font-semibold text-directorio-700 mb-4">Tiendas Premium</h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {premiumStores.map((store) => (
            <CarouselItem key={store.id} className="md:basis-1/3 lg:basis-1/4">
              <Link to={`/tienda/${store.id}`}>
                <Card className="h-44 overflow-hidden border-directorio-200 hover:border-directorio-400 transition-colors">
                  <div className="w-full h-full relative p-4 flex flex-col items-center justify-center">
                    <div className="h-24 flex items-center justify-center mb-2">
                      <img 
                        src={store.logo} 
                        alt={store.name}
                        className="h-full object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium text-directorio-700 line-clamp-1">{store.name}</h4>
                      <p className="text-sm text-gray-500">{store.category}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 bg-white/80" />
        <CarouselNext className="right-1 bg-white/80" />
      </Carousel>
    </div>
  );
};
