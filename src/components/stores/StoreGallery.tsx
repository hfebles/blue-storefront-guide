
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface StoreImage {
  id: string;
  image_url: string;
  image_order: number;
}

interface StoreGalleryProps {
  storeId: string;
}

export const StoreGallery = ({ storeId }: StoreGalleryProps) => {
  const [images, setImages] = useState<StoreImage[]>([]);

  useEffect(() => {
    const fetchStoreImages = async () => {
      const { data, error } = await supabase
        .from('store_images')
        .select('*')
        .eq('store_id', storeId)
        .order('image_order', { ascending: true });

      if (!error && data) {
        setImages(data);
      }
    };

    fetchStoreImages();
  }, [storeId]);

  if (images.length === 0) return null;

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
