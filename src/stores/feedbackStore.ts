import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Feedback {
  id: string;
  userId: string;
  username: string;
  message: string;
  rating: number;
  date: string;
  status: 'pending' | 'reviewed';
}

interface FeedbackState {
  feedback: Feedback[];
  addFeedback: (feedback: Omit<Feedback, 'id' | 'date' | 'status'>) => void;
  updateStatus: (id: string, status: 'pending' | 'reviewed') => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      feedback: [],
      addFeedback: (feedback) =>
        set((state) => ({
          feedback: [
            {
              ...feedback,
              id: Math.random().toString(36).substr(2, 9),
              date: new Date().toISOString(),
              status: 'pending',
            },
            ...state.feedback,
          ],
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          feedback: state.feedback.map((f) =>
            f.id === id ? { ...f, status } : f
          ),
        })),
    }),
    {
      name: 'feedback-storage',
    }
  )
);