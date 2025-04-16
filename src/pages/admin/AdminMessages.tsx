
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Search, Eye, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { useContactMessages } from "@/hooks/useContactMessages";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";

const AdminMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { messages, isLoading } = useContactMessages();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewMessage = async (message: any) => {
    setSelectedMessage(message);
    
    // Mark as read if not already read
    if (!message.read) {
      try {
        const { error } = await supabase
          .from("contact_messages")
          .update({ read: true })
          .eq("id", message.id);

        if (error) throw error;
        
        // Invalidate the messages query to refresh the data
        queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este mensaje?")) {
      try {
        const { error } = await supabase
          .from("contact_messages")
          .delete()
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Mensaje eliminado",
          description: "El mensaje ha sido eliminado correctamente.",
        });

        // If the deleted message is currently being viewed, close the dialog
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }

        // Invalidate the messages query to refresh the data
        queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error al eliminar",
          description: error.message,
        });
      }
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: es });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mensajes</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <Search className="h-4 w-4 mr-2 text-gray-400" />
            <Input
              placeholder="Buscar mensajes..."
              className="max-w-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {isLoading ? (
            <div className="text-center py-8">Cargando mensajes...</div>
          ) : filteredMessages.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estado</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>
                        {!message.read ? (
                          <Badge variant="default" className="bg-directorio-500">Nuevo</Badge>
                        ) : (
                          <Badge variant="outline">Leído</Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {message.name}
                      </TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell>
                        {formatDate(message.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleViewMessage(message)}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Ver</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <MessageSquare className="h-5 w-5" />
                                  Mensaje de {selectedMessage?.name}
                                </DialogTitle>
                                <DialogDescription>
                                  Recibido el {selectedMessage && formatDate(selectedMessage.created_at)}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4 mt-4">
                                <div>
                                  <div className="text-sm font-medium text-gray-500">Email:</div>
                                  <div>{selectedMessage?.email}</div>
                                </div>
                                
                                <div>
                                  <div className="text-sm font-medium text-gray-500">Mensaje:</div>
                                  <div className="mt-1 whitespace-pre-wrap bg-gray-50 p-3 rounded-md border">
                                    {selectedMessage?.message}
                                  </div>
                                </div>
                              </div>
                              
                              <DialogFooter className="mt-6">
                                <Button
                                  variant="destructive"
                                  onClick={() => selectedMessage && handleDeleteMessage(selectedMessage.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Eliminar
                                </Button>
                                <DialogClose asChild>
                                  <Button variant="outline">
                                    Cerrar
                                  </Button>
                                </DialogClose>
                                <Button asChild>
                                  <a href={`mailto:${selectedMessage?.email}`}>
                                    Responder
                                  </a>
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteMessage(message.id)}
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
              No se encontraron mensajes
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMessages;
