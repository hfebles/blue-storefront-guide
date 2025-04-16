
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
