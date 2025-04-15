
import { useState, useEffect } from "react";
import StoreCard from "@/components/stores/StoreCard";
import CategoryFilter from "@/components/stores/CategoryFilter";
import { Store, Category } from "@/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Datos de muestra hasta que integremos Supabase
const SAMPLE_CATEGORIES: Category[] = [
  { id: "1", name: "Restaurantes", slug: "restaurantes" },
  { id: "2", name: "Moda", slug: "moda" },
  { id: "3", name: "Tecnología", slug: "tecnologia" },
  { id: "4", name: "Salud", slug: "salud" },
  { id: "5", name: "Hogar", slug: "hogar" },
  { id: "6", name: "Servicios", slug: "servicios" },
];

const SAMPLE_STORES: Store[] = [
  {
    id: "1",
    name: "Restaurante El Rincón",
    description: "Comida tradicional casera con ingredientes locales y de temporada. Menú diario y especialidades de fin de semana.",
    phone: "123-456-7890",
    address: "Calle Principal 123",
    logo: "https://placehold.co/400x300?text=Restaurante+El+Rincón",
    category: "Restaurantes",
  },
  {
    id: "2",
    name: "Moda Elegante",
    description: "Boutique de ropa con las últimas tendencias. Moda para hombre y mujer con prendas exclusivas importadas.",
    phone: "123-456-7891",
    address: "Av. de la Moda 456",
    logo: "https://placehold.co/400x300?text=Moda+Elegante",
    category: "Moda",
  },
  {
    id: "3",
    name: "TechStore",
    description: "Tienda de dispositivos electrónicos, reparaciones y accesorios. Servicio técnico especializado y garantía extendida.",
    phone: "123-456-7892",
    address: "Plaza Tecnología 789",
    logo: "https://placehold.co/400x300?text=TechStore",
    category: "Tecnología",
  },
  {
    id: "4",
    name: "Farmacia Salud Total",
    description: "Medicamentos, productos de cuidado personal y asesoramiento farmacéutico. Servicio 24 horas y entregas a domicilio.",
    phone: "123-456-7893",
    address: "Av. Bienestar 101",
    logo: "https://placehold.co/400x300?text=Farmacia+Salud+Total",
    category: "Salud",
  },
  {
    id: "5",
    name: "Muebles Confort",
    description: "Mobiliario para el hogar, diseño moderno y tradicional. Fabricación personalizada y entrega en toda la ciudad.",
    phone: "123-456-7894",
    address: "Calle Industrial 202",
    logo: "https://placehold.co/400x300?text=Muebles+Confort",
    category: "Hogar",
  },
  {
    id: "6",
    name: "Limpieza Express",
    description: "Servicio de limpieza para hogares y oficinas. Planes semanales, quincenales o por evento con personal capacitado.",
    phone: "123-456-7895",
    address: "Paseo del Servicio 303",
    logo: "https://placehold.co/400x300?text=Limpieza+Express",
    category: "Servicios",
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState<Store[]>(SAMPLE_STORES);
  
  useEffect(() => {
    let filtered = SAMPLE_STORES;
    
    if (selectedCategory) {
      const category = SAMPLE_CATEGORIES.find(cat => cat.id === selectedCategory);
      if (category) {
        filtered = filtered.filter(store => store.category === category.name);
      }
    }
    
    if (searchTerm) {
      filtered = filtered.filter(store => 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        store.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredStores(filtered);
  }, [selectedCategory, searchTerm]);
  
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
        categories={SAMPLE_CATEGORIES} 
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      {filteredStores.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-600">No se encontraron comercios que coincidan con tu búsqueda</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
