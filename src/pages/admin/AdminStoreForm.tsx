import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Store } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { Switch } from "@/components/ui/switch";
import { formatISO } from "date-fns";
import { StoreImageUploader } from "@/components/admin/StoreImageUploader";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  category: z.string().min(1, { message: "La categoría es obligatoria" }),
  description: z.string().min(1, { message: "La descripción es obligatoria" }),
  phone: z.string().min(1, { message: "El teléfono es obligatorio" }),
  address: z.string().min(1, { message: "La dirección es obligatoria" }),
  logo: z.string().min(1, { message: "La URL del logo es obligatoria" }),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  is_featured: z.boolean().default(false),
  featured_order: z.string().optional(),
  is_new: z.boolean().default(true),
  new_until: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AdminStoreForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      phone: "",
      address: "",
      logo: "https://via.placeholder.com/150",
      latitude: "",
      longitude: "",
      is_featured: false,
      featured_order: "",
      is_new: true,
      new_until: "",
    },
  });

  useEffect(() => {
    if (id) {
      const fetchStore = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("stores")
          .select("*")
          .eq("id", id)
          .single();

        setIsLoading(false);

        if (error) {
          console.error("Error fetching store:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudo cargar el comercio",
          });
          navigate("/admin/stores");
          return;
        }

        if (data) {
          form.reset({
            name: data.name,
            category: data.category,
            description: data.description,
            phone: data.phone,
            address: data.address,
            logo: data.logo,
            latitude: data.latitude?.toString() || "",
            longitude: data.longitude?.toString() || "",
            is_featured: !!data.is_featured,
            featured_order: data.featured_order?.toString() ?? "",
            is_new: !!data.is_new,
            new_until: data.new_until ? formatISO(new Date(data.new_until), { representation: "date" }) : "",
          });
        }
      };

      fetchStore();
    }
  }, [id, form, navigate, toast]);

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const storeData = {
        name: values.name,
        category: values.category,
        description: values.description,
        phone: values.phone,
        address: values.address,
        logo: values.logo,
        latitude: values.latitude ? parseFloat(values.latitude) : null,
        longitude: values.longitude ? parseFloat(values.longitude) : null,
        is_featured: values.is_featured,
        featured_order: values.featured_order ? parseInt(values.featured_order) : 0,
        is_new: values.is_new,
        new_until: values.new_until ? new Date(values.new_until).toISOString() : null,
      };

      if (id) {
        const { error } = await supabase
          .from("stores")
          .update(storeData)
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Comercio actualizado",
          description: "El comercio se ha actualizado correctamente",
        });
      } else {
        const { data, error } = await supabase
          .from("stores")
          .insert([storeData])
          .select();

        if (error) {
          console.error("Error creating store:", error);
          throw error;
        }

        toast({
          title: "Comercio creado",
          description: "El nuevo comercio se ha creado correctamente",
        });
        
        if (data && data[0]) {
          navigate(`/admin/stores/edit/${data[0].id}`);
        } else {
          form.reset();
        }
      }

      queryClient.invalidateQueries({ queryKey: ["stores"] });
      if (!id) {
        navigate("/admin/stores");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Ocurrió un error al guardar el comercio",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Available categories:", categories);
  console.log("Current form values:", form.getValues());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Editar comercio" : "Añadir nuevo comercio"}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {id ? "Detalles del comercio" : "Información del nuevo comercio"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del comercio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoriesLoading ? (
                              <SelectItem value="loading" disabled>
                                Cargando categorías...
                              </SelectItem>
                            ) : categories && categories.length > 0 ? (
                              categories.map((category) => (
                                <SelectItem key={category.id} value={category.name}>
                                  {category.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>
                                No hay categorías disponibles
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="Teléfono del comercio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Dirección del comercio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL del logo</FormLabel>
                      <FormControl>
                        <Input placeholder="URL de la imagen del logo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitud (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Latitud" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitud (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Longitud" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="is_featured"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Tienda destacada?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <span className="text-xs text-gray-500">Aparecerá en la sección premium/patrocinada</span>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured_order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Orden destacado (opcional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. 1 (menor aparecerá primero)"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <span className="text-xs text-gray-500">Sólo para destacadas.</span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="is_new"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Marcar como nueva?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <span className="text-xs text-gray-500">Se resaltará como tienda nueva.</span>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="new_until"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mostrar como nueva hasta</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <span className="text-xs text-gray-500">Déjalo vacío para usar el valor por defecto.</span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción del comercio"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/stores")}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading || categoriesLoading}>
                  {isLoading ? "Guardando..." : id ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {id && <StoreImageUploader storeId={id} />}
    </div>
  );
};

export default AdminStoreForm;
