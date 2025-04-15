
export interface Store {
  id: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  logo: string;
  category: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}
