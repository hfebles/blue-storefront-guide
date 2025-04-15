
import { supabase } from '@/lib/supabase';
import { ContactMessage } from '@/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export const useContactMessages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ContactMessage[];
    },
  });

  const createMessage = useMutation({
    mutationFn: async (newMessage: Omit<ContactMessage, 'id' | 'created_at' | 'read'>) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{ ...newMessage, read: false }])
        .select()
        .single();

      if (error) throw error;
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
      toast({
        variant: 'destructive',
        title: 'Error al enviar el mensaje',
        description: error.message,
      });
    },
  });

  return {
    messages: messages || [],
    isLoading,
    createMessage,
  };
};
