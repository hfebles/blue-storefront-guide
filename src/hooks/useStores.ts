
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Store } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useStores = (categoryId?: string | null) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: stores, isLoading, error } = useQuery({
    queryKey: ['stores', categoryId, searchTerm],
    queryFn: async () => {
      console.log('Fetching stores with categoryId:', categoryId, 'and searchTerm:', searchTerm);
      
      let query = supabase.from('stores').select('*');

      if (categoryId) {
        // First get the category name
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('name')
          .eq('id', categoryId)
          .single();
        
        if (categoryError) {
          console.error('Error fetching category:', categoryError);
          throw categoryError;
        }
        
        if (categoryData) {
          console.log('Filtering by category:', categoryData.name);
          query = query.eq('category', categoryData.name);
        }
      }

      if (searchTerm) {
        console.log('Searching for term:', searchTerm);
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching stores:', error);
        throw error;
      }
      
      console.log('Fetched stores:', data);
      return data as Store[];
    },
    refetchOnMount: true,
  });

  return {
    stores: stores || [],
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
  };
};
