import create from 'zustand';
import { persist } from 'zustand/middleware';

interface HistoryEntry {
  id: string;
  userId: string;
  username: string;
  date: string;
  state: string;
  zone: string;
  weapon: string;
  ammo: string;
  stock: number;
  prediction: any;
}

interface HistoryState {
  entries: HistoryEntry[];
  addEntry: (entry: Omit<HistoryEntry, 'id' | 'date'>) => void;
  clearHistory: () => void;
  getEntriesByUser: (userId: string) => HistoryEntry[];
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            {
              ...entry,
              id: Math.random().toString(36).substr(2, 9),
              date: new Date().toISOString(),
            },
            ...state.entries,
          ],
        })),
      clearHistory: () => set({ entries: [] }),
      getEntriesByUser: (userId) => 
        get().entries.filter((entry) => entry.userId === userId),
    }),
    {
      name: 'history-storage',
    }
  )
);