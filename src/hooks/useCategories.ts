
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Fetching categories');
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
      
      console.log('Fetched categories:', data);
      return data as Category[];
    },
    refetchOnMount: true,
  });

  return {
    categories: categories || [],
    isLoading,
    error,
  };
};
