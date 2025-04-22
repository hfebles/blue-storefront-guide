
import { useEffect, useState } from "react";
import { Store } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";

export const FeaturedStoresCarousel = () => {
  const [featuredStores, setFeaturedStores] = useState<Store[]>([]);

  useEffect(() => {
    const fetchFeaturedStores = async () => {
      const { data, error } = await supabase
        .from('stores')
        .select('*, store_images(*)')
        .eq('is_featured', true)
        .order('featured_order', { ascending: true });

      if (!error && data) {
        setFeaturedStores(data);
      }
    };

    fetchFeaturedStores();
  }, []);

  if (featuredStores.length === 0) return null;

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold text-directorio-700 mb-6 text-center">Tiendas Destacadas</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {featuredStores.map((store) => (
            <CarouselItem key={store.id} className="md:basis-1/2 lg:basis-1/3">
              <Link to={`/tienda/${store.id}`}>
                <Card className="h-64 overflow-hidden">
                  <div className="w-full h-full relative">
                    <img 
                      src={store.logo} 
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white font-semibold">{store.name}</h3>
                      <p className="text-white/80 text-sm">{store.category}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
