
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { StoreImage } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

interface StoreGalleryProps {
  storeId: string;
}

export const StoreGallery = ({ storeId }: StoreGalleryProps) => {
  const [images, setImages] = useState<StoreImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreImages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('store_images')
          .select('*')
          .eq('store_id', storeId)
          .order('image_order', { ascending: true });

        if (!error && data) {
          setImages(data);
        } else {
          console.error('Error fetching store images:', error);
        }
      } catch (err) {
        console.error('Error in store gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchStoreImages();
    }
  }, [storeId]);

  if (loading) {
    return (
      <div className="w-full py-6">
        <h3 className="text-xl font-semibold text-directorio-700 mb-4">Galería</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full py-6">
        <h3 className="text-xl font-semibold text-directorio-700 mb-4">Galería</h3>
        <p className="text-gray-500 italic">No hay imágenes disponibles para esta tienda.</p>
      </div>
    );
  }

  return (
    <div className="w-full py-6">
      <h3 className="text-xl font-semibold text-directorio-700 mb-4">Galería</h3>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-64 overflow-hidden">
                <img 
                  src={image.image_url} 
                  alt="Imagen de la tienda"
                  className="w-full h-full object-cover"
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
