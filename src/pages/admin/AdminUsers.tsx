
import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, UserPlus, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email("Debe ser un email válido"),
  role: z.string().min(1, { message: "El rol es obligatorio" }),
});

type FormValues = z.infer<typeof formSchema>;

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "admin",
    },
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("directory_admins")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los usuarios",
      });
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (values: FormValues) => {
    try {
      if (editingUser) {
        // Update
        const { error } = await supabase
          .from("directory_admins")
          .update({
            email: values.email,
            role: values.role,
          })
          .eq("id", editingUser.id);

        if (error) throw error;

        toast({
          title: "Usuario actualizado",
          description: "El usuario se ha actualizado correctamente",
        });
      } else {
        // Check if email already exists in Supabase Auth
        const { data: existingUsers, error: fetchError } = await supabase
          .from("directory_admins")
          .select("email")
          .eq("email", values.email);

        if (fetchError) throw fetchError;

        if (existingUsers && existingUsers.length > 0) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Este email ya está registrado",
          });
          return;
        }

        // Create new user
        const { error } = await supabase
          .from("directory_admins")
          .insert([{ email: values.email, role: values.role }]);

        if (error) throw error;

        toast({
          title: "Usuario creado",
          description: "El usuario ha sido creado. Deben registrarse con este email en la plataforma.",
        });
      }

      setOpen(false);
      form.reset();
      setEditingUser(null);
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    form.reset({
      email: user.email,
      role: user.role,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string, email: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${email}?`)) {
      try {
        const { error } = await supabase
          .from("directory_admins")
          .delete()
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Usuario eliminado",
          description: "El usuario ha sido eliminado correctamente",
        });

        fetchUsers();
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setEditingUser(null);
      form.reset();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usuarios administradores</h1>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-directorio-500 hover:bg-directorio-600">
              <UserPlus className="h-4 w-4 mr-2" />
              Añadir usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Editar usuario" : "Añadir nuevo usuario"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email del administrador"
                          {...field}
                          disabled={!!editingUser}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un rol" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="pt-4">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button type="submit">
                    {editingUser ? "Actualizar" : "Crear"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Cargando usuarios...</div>
          ) : users.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Fecha de creación</TableHead>
                    <TableHead className="w-[180px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.email}
                      </TableCell>
                      <TableCell className="capitalize">
                        {user.role}
                      </TableCell>
                      <TableCell>
                        {formatDate(user.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(user)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                          >
                            <a href={`mailto:${user.email}`}>
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Contactar</span>
                            </a>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(user.id, user.email)}
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
              No hay usuarios. Añade uno para comenzar.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
