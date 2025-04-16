
import { useState, useEffect } from "react";
import StoreCard from "@/components/stores/StoreCard";
import CategoryFilter from "@/components/stores/CategoryFilter";
import { Category } from "@/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useStores } from "@/hooks/useStores";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { stores, isLoading: storesLoading, searchTerm, setSearchTerm } = useStores(selectedCategory);
  const { toast } = useToast();
  
  // Obtener categorías desde Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');
          
        if (error) {
          throw error;
        }
        
        setCategories(data as Category[]);
      } catch (error: any) {
        console.error('Error loading categories:', error);
        toast({
          variant: 'destructive',
          title: 'Error al cargar categorías',
          description: error.message,
        });
      }
    };
    
    fetchCategories();
  }, [toast]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-directorio-700 mb-4">Descubre comercios locales</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explora los mejores negocios y servicios de tu zona y apoya el comercio local
        </p>
      </div>
      
      <div className="max-w-xl mx-auto mb-8 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          className="pl-10 border-directorio-200 focus-visible:ring-directorio-400"
          placeholder="Buscar tiendas o servicios..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <CategoryFilter 
        categories={categories} 
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      {storesLoading ? (
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-600">Cargando comercios...</h2>
        </div>
      ) : stores.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-600">No se encontraron comercios que coincidan con tu búsqueda</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
