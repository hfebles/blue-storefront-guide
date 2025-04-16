
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useStores } from "@/hooks/useStores";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

const AdminStores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { stores, isLoading } = useStores();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteStore = async (id: string, storeName: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar ${storeName}?`)) {
      try {
        const { error } = await supabase.from("stores").delete().eq("id", id);

        if (error) throw error;

        toast({
          title: "Comercio eliminado",
          description: `${storeName} ha sido eliminado correctamente.`,
        });

        // Invalidate the stores query to refresh the data
        queryClient.invalidateQueries({ queryKey: ["stores"] });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error al eliminar",
          description: error.message,
        });
      }
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Comercios</h1>
        <Link to="/admin/stores/new">
          <Button className="bg-directorio-500 hover:bg-directorio-600">
            <Plus className="h-4 w-4 mr-2" />
            Añadir nuevo
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <Search className="h-4 w-4 mr-2 text-gray-400" />
            <Input
              placeholder="Buscar comercios..."
              className="max-w-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {isLoading ? (
            <div className="text-center py-8">Cargando comercios...</div>
          ) : filteredStores.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStores.map((store) => (
                    <TableRow key={store.id}>
                      <TableCell className="font-medium">{store.name}</TableCell>
                      <TableCell>{store.category}</TableCell>
                      <TableCell>{store.address}</TableCell>
                      <TableCell>{store.phone}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/admin/stores/${store.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteStore(store.id, store.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No se encontraron comercios
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStores;
