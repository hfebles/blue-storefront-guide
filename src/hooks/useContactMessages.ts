
import { supabase } from '@/integrations/supabase/client';
import { ContactMessage } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export const useContactMessages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      console.log("Fetching contact messages");
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching contact messages:", error);
        throw error;
      }
      
      console.log("Fetched contact messages:", data);
      return data as ContactMessage[];
    },
  });

  const createMessage = useMutation({
    mutationFn: async (newMessage: Omit<ContactMessage, 'id' | 'created_at' | 'read'>) => {
      console.log("Creating new contact message:", newMessage);
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{ ...newMessage, read: false }])
        .select()
        .single();

      if (error) {
        console.error("Error creating contact message:", error);
        throw error;
      }
      
      console.log("Created contact message:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast({
        title: 'Mensaje enviado',
        description: 'Gracias por contactarnos. Te responderemos pronto.',
      });
    },
    onError: (error: any) => {
      console.error("Error in mutation:", error);
      toast({
        variant: 'destructive',
        title: 'Error al enviar el mensaje',
        description: error.message || "Ocurrió un error al enviar el mensaje",
      });
    },
  });

  const markAsRead = useMutation({
    mutationFn: async (messageId: string) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', messageId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    },
  });

  const deleteMessage = useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast({
        title: 'Mensaje eliminado',
        description: 'El mensaje ha sido eliminado correctamente.',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Error al eliminar el mensaje',
        description: error.message,
      });
    },
  });

  return {
    messages: messages || [],
    isLoading,
    createMessage,
    markAsRead,
    deleteMessage,
  };
};
