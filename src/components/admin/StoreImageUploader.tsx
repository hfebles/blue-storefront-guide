
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { StoreImage } from "@/types";
import { Trash2 } from "lucide-react";

interface StoreImageUploaderProps {
  storeId: string | undefined;
}

export const StoreImageUploader = ({ storeId }: StoreImageUploaderProps) => {
  const { toast } = useToast();
  const [images, setImages] = useState<StoreImage[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStoreImages = async () => {
    if (!storeId) return;

    try {
      const { data, error } = await supabase
        .from('store_images')
        .select('*')
        .eq('store_id', storeId)
        .order('image_order', { ascending: true });

      if (!error && data) {
        setImages(data);
      } else {
        console.error('Error fetching images:', error);
      }
    } catch (err) {
      console.error('Error in fetch store images:', err);
    }
  };

  // Cargar las imágenes existentes cuando se monta el componente o cambia el storeId
  useState(() => {
    if (storeId) {
      fetchStoreImages();
    }
  });

  const addImage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!storeId) {
      toast({
        title: "Error",
        description: "Primero debe guardar la tienda para agregar imágenes",
        variant: "destructive",
      });
      return;
    }
    
    if (!imageUrl.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingrese una URL de imagen válida",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const newImage = {
        store_id: storeId,
        image_url: imageUrl,
        image_order: images.length
      };
      
      const { error } = await supabase
        .from('store_images')
        .insert([newImage]);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Imagen agregada",
        description: "La imagen se agregó correctamente a la galería",
      });
      
      setImageUrl("");
      fetchStoreImages(); // Volver a cargar las imágenes
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al agregar la imagen",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const deleteImage = async (imageId: string) => {
    if (!confirm("¿Está seguro que desea eliminar esta imagen?")) return;
    
    try {
      const { error } = await supabase
        .from('store_images')
        .delete()
        .eq('id', imageId);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Imagen eliminada",
        description: "La imagen fue eliminada de la galería",
      });
      
      fetchStoreImages(); // Volver a cargar las imágenes
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al eliminar la imagen",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Galería de imágenes (Premium)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addImage} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">
              Agregue hasta 5 imágenes para mostrar en la galería (solo tiendas premium)
            </p>
            
            <div className="flex gap-2">
              <Input
                placeholder="URL de la imagen"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={loading || images.length >= 5 || !storeId}
              />
              <Button 
                type="submit" 
                disabled={loading || images.length >= 5 || !storeId}
              >
                {loading ? "Agregando..." : "Agregar"}
              </Button>
            </div>
          </div>
          
          {!storeId && (
            <p className="text-amber-600 text-sm">
              Debe guardar la tienda primero para poder agregar imágenes
            </p>
          )}
          
          {images.length >= 5 && (
            <p className="text-amber-600 text-sm">
              Ha alcanzado el límite de 5 imágenes
            </p>
          )}
        </form>
        
        {images.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Imágenes agregadas:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img 
                    src={image.image_url} 
                    alt="Imagen de tienda" 
                    className="h-24 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => deleteImage(image.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
