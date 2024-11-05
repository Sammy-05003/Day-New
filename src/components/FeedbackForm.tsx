import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useFeedbackStore } from '../stores/feedbackStore';
import { useAuthStore } from '../stores/authStore';

export default function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const addFeedback = useFeedbackStore((state) => state.addFeedback);
  const { userData } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !rating) return;

    addFeedback({
      userId: userData.id,
      username: userData.username,
      message,
      rating,
    });

    setMessage('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Rating</label>
        <div className="flex space-x-2 mt-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  value <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Feedback</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700/50 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Share your feedback..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Feedback
      </button>
    </form>
  );
}