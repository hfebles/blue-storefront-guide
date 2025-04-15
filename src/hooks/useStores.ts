
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Store } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useStores = (categoryId?: string | null) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: stores, isLoading } = useQuery({
    queryKey: ['stores', categoryId, searchTerm],
    queryFn: async () => {
      let query = supabase.from('stores').select('*');

      if (categoryId) {
        const { data: category } = await supabase
          .from('categories')
          .select('name')
          .eq('id', categoryId)
          .single();

        if (category) {
          query = query.eq('category', category.name);
        }
      }

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data as Store[];
    },
  });

  return {
    stores: stores || [],
    isLoading,
    searchTerm,
    setSearchTerm,
  };
};
