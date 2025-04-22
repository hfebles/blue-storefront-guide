
export interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  logo: string;
  category: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  is_featured?: boolean;
  featured_order?: number;
  is_new?: boolean;
  new_until?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface StoreImage {
  id: string;
  store_id: string;
  image_url: string;
  image_order: number;
  created_at: string;
}
