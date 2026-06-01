import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

// Generic real-time collection hook
export function useCollection<T extends { id: string }>(
  collectionName: string,
  orderField: string = 'createdAt',
  orderDir: 'asc' | 'desc' = 'desc'
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let q;
    try {
      q = query(collection(db, collectionName), orderBy(orderField, orderDir));
    } catch {
      q = collection(db, collectionName);
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as T[];
        setData(items);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`Error in ${collectionName}:`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, orderField, orderDir]);

  return { data, loading, error };
}

// Add document
export async function addDocument(collectionName: string, data: Record<string, unknown>) {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: Date.now(),
  });
  return docRef.id;
}

// Update document
export async function updateDocument(
  collectionName: string,
  id: string,
  data: Record<string, unknown>
) {
  await updateDoc(doc(db, collectionName, id), data);
}

// Delete document
export async function deleteDocument(collectionName: string, id: string) {
  await deleteDoc(doc(db, collectionName, id));
}

// Set a singleton document (for settings)
export async function setDocument(
  collectionName: string,
  id: string,
  data: Record<string, unknown>
) {
  await setDoc(doc(db, collectionName, id), data, { merge: true });
}

// Get a singleton document
export async function getDocument(collectionName: string, id: string) {
  const snap = await getDoc(doc(db, collectionName, id));
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
}

// Real-time singleton doc hook
export function useDocument<T>(collectionName: string, id: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, collectionName, id),
      (snap) => {
        if (snap.exists()) {
          setData({ id: snap.id, ...snap.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [collectionName, id]);

  return { data, loading };
}
