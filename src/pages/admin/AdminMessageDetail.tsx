
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MessageSquare, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useContactMessages } from "@/hooks/useContactMessages";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ContactMessage } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminMessageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { messages, isLoading, markAsRead, deleteMessage } = useContactMessages();
  const { toast } = useToast();
  const [message, setMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    // Find the specific message from the list of messages
    if (messages && messages.length > 0 && id) {
      const foundMessage = messages.find(msg => msg.id === id);
      if (foundMessage) {
        setMessage(foundMessage);
        
        // Mark as read if not already read
        if (!foundMessage.read) {
          markAsRead.mutate(id);
        }
      } else {
        // Message not found
        toast({
          variant: "destructive",
          title: "Mensaje no encontrado",
          description: "No se pudo encontrar el mensaje solicitado",
        });
        navigate("/admin/messages");
      }
    }
  }, [id, messages, markAsRead, navigate, toast]);

  const handleDeleteMessage = async () => {
    try {
      await deleteMessage.mutateAsync(id!);
      toast({
        title: "Mensaje eliminado",
        description: "El mensaje ha sido eliminado correctamente.",
      });
      navigate("/admin/messages");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al eliminar",
        description: error.message || "Hubo un error al eliminar el mensaje",
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: es });
    } catch (e) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Detalle del mensaje</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">Cargando mensaje...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Detalle del mensaje</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <p className="mb-4 text-gray-500">Mensaje no encontrado</p>
              <Button asChild>
                <Link to="/admin/messages">Volver a la lista de mensajes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Mensaje de {message.name}
        </h1>
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/messages" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a la lista
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <div className="font-medium text-xl">{message.name}</div>
              <div className="text-sm text-gray-500">
                {formatDate(message.created_at)}
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar mensaje
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. El mensaje será eliminado permanentemente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteMessage}>
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500">Email:</div>
              <div className="flex items-center justify-between">
                <div>{message.email}</div>
                <Button asChild size="sm">
                  <a href={`mailto:${message.email}`}>
                    Responder
                  </a>
                </Button>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-500">Mensaje:</div>
              <div className="mt-2 p-4 bg-gray-50 rounded-md border whitespace-pre-wrap">
                {message.message}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMessageDetail;
