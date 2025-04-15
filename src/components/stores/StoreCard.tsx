
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Store } from "@/types";
import { Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <Link to={`/tienda/${store.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 border-directorio-100 cursor-pointer">
        <div className="h-48 overflow-hidden bg-directorio-50 flex items-center justify-center p-4">
          <img 
            src={store.logo} 
            alt={`Logo de ${store.name}`} 
            className="h-full object-contain"
          />
        </div>
        <CardContent className="p-4">
          <div className="bg-directorio-50 text-directorio-600 text-xs px-2 py-1 rounded-full mb-2 inline-block">
            {store.category}
          </div>
          <h3 className="font-bold text-lg text-directorio-800 mb-2">{store.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{store.description}</p>
          
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <Phone size={14} className="mr-2 text-directorio-400" />
            <span>{store.phone}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin size={14} className="mr-2 text-directorio-400" />
            <span className="truncate">{store.address}</span>
          </div>
        </CardContent>
        <CardFooter className="bg-white px-4 py-3 border-t border-directorio-50">
          <span className="text-sm text-directorio-500 font-medium">Ver detalles →</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default StoreCard;
