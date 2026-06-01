export interface Video {
  id: string;
  title: string;
  description: string;
  link: string;
  embedUrl: string;
  category: string;
  createdAt: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  project: string;
  budget: string;
  description: string;
  status: string;
  createdAt: number;
}

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  portfolio: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'shortlisted';
  createdAt: number;
}

export interface Settings {
  id: string;
  instagramLink: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  userType: 'admin' | 'user' | null;
  loginTime: number | null;
}
