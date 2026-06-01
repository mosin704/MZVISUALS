// Local store that mimics Firebase real-time behavior
// This works without a Firebase project configured

import { Video, Review, Client, Application, Settings } from '../types';

type StoreListener<T> = (data: T[]) => void;
type DocListener<T> = (data: T | null) => void;

class LocalStore {
  private data: Record<string, Record<string, unknown>[]> = {
    videos: [],
    reviews: [],
    clients: [],
    applications: [],
  };

  private docs: Record<string, Record<string, unknown>> = {
    settings: {
      id: 'main',
      instagramLink: 'https://www.instagram.com/mzvisuals',
      heroTitle: 'Visual Storytelling That Moves',
      heroSubtitle: 'We craft cinematic videos, reels & brand content that captivate your audience.',
    },
  };

  private listeners: Record<string, StoreListener<unknown>[]> = {};
  private docListeners: Record<string, DocListener<unknown>[]> = {};

  private idCounter = 1;

  private generateId(): string {
    return `local_${Date.now()}_${this.idCounter++}`;
  }

  private notifyListeners(collection: string) {
    const ls = this.listeners[collection] || [];
    const items = [...(this.data[collection] || [])].sort((a: any, b: any) => b.createdAt - a.createdAt);
    ls.forEach((l) => l(items));
  }

  private notifyDocListeners(key: string) {
    const ls = this.docListeners[key] || [];
    const d = this.docs[key] || null;
    ls.forEach((l) => l(d));
  }

  subscribe<T>(collection: string, listener: StoreListener<T>): () => void {
    if (!this.listeners[collection]) this.listeners[collection] = [];
    this.listeners[collection].push(listener as StoreListener<unknown>);

    // Immediately fire with current data
    const items = [...(this.data[collection] || [])].sort((a: any, b: any) => b.createdAt - a.createdAt);
    listener(items as T[]);

    return () => {
      this.listeners[collection] = this.listeners[collection].filter((l) => l !== listener);
    };
  }

  subscribeDoc<T>(key: string, listener: DocListener<T>): () => void {
    if (!this.docListeners[key]) this.docListeners[key] = [];
    this.docListeners[key].push(listener as DocListener<unknown>);

    // Immediately fire
    const d = this.docs[key] || null;
    listener(d as T | null);

    return () => {
      this.docListeners[key] = this.docListeners[key].filter((l) => l !== listener);
    };
  }

  add(collection: string, data: Record<string, unknown>): string {
    if (!this.data[collection]) this.data[collection] = [];
    const id = this.generateId();
    const item = { ...data, id, createdAt: Date.now() };
    this.data[collection].push(item);
    this.notifyListeners(collection);
    return id;
  }

  update(collection: string, id: string, data: Record<string, unknown>): void {
    if (!this.data[collection]) return;
    const idx = this.data[collection].findIndex((item: any) => item.id === id);
    if (idx !== -1) {
      this.data[collection][idx] = { ...this.data[collection][idx], ...data };
      this.notifyListeners(collection);
    }
  }

  delete(collection: string, id: string): void {
    if (!this.data[collection]) return;
    this.data[collection] = this.data[collection].filter((item: any) => item.id !== id);
    this.notifyListeners(collection);
  }

  setDoc(key: string, data: Record<string, unknown>): void {
    this.docs[key] = { ...this.docs[key], ...data };
    this.notifyDocListeners(key);
  }

  getDoc(key: string): Record<string, unknown> | null {
    return this.docs[key] || null;
  }
}

export const store = new LocalStore();

// Seed some demo data
function seedData() {
  store.add('videos', {
    title: 'Brand Story - Fashion House',
    description: 'Cinematic brand video for a luxury fashion brand launch.',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Brand Film',
  });

  store.add('videos', {
    title: 'Product Launch Reel',
    description: 'Dynamic product reveal for a tech startup.',
    link: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    embedUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    category: 'Reel',
  });

  store.add('reviews', {
    name: 'Sarah Mitchell',
    rating: 5,
    message: 'MZ Visuals transformed our brand completely. The cinematic quality of their work is unmatched. Highly recommend!',
  });

  store.add('reviews', {
    name: 'Ahmed Karimi',
    rating: 5,
    message: 'Exceptional team! They delivered our campaign video ahead of schedule and it exceeded all expectations.',
  });

  store.add('reviews', {
    name: 'Priya Sharma',
    rating: 4,
    message: 'Professional, creative and responsive. Our social media engagement doubled after working with MZ Visuals.',
  });
}

seedData();

export type { Video, Review, Client, Application, Settings };
