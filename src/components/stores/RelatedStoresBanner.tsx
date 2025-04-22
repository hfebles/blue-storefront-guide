
import { useEffect, useState } from "react";
import { Store } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";

interface RelatedStoresBannerProps {
  currentStoreId: string;
  category: string;
}

export const RelatedStoresBanner = ({ currentStoreId, category }: RelatedStoresBannerProps) => {
  const [relatedStores, setRelatedStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedStores = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('stores')
          .select('*')
          .eq('category', category)
          .neq('id', currentStoreId)
          .order('created_at', { ascending: false })
          .limit(8);

        if (!error && data) {
          setRelatedStores(data);
        } else {
          console.error('Error fetching related stores:', error);
        }
      } catch (err) {
        console.error('Error in related stores banner:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedStores();
  }, [currentStoreId, category]);

  if (loading || relatedStores.length === 0) return null;

  return (
    <div className="w-full py-6 mt-8">
      <h3 className="text-xl font-semibold text-directorio-700 mb-4">Más tiendas en {category}</h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {relatedStores.map((store) => (
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
