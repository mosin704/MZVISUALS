import { useEffect, useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';
import { store } from '../store/localStore';
import { Review } from '../types';

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const unsub = store.subscribe<Review>('reviews', (data) => {
      setReviews(data);
    });
    return unsub;
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      alert('Please fill in your name and review message.');
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300));

      store.add('reviews', {
        name: name.trim(),
        rating,
        message: message.trim(),
      });

      setSubmitted(true);
      setName('');
      setMessage('');
      setRating(5);
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      alert('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-4">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Client Reviews</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            What Our Clients{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Say
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Real feedback from real clients who trusted us with their vision.
          </p>
        </div>

        {/* Reviews grid */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}`}
                    />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">"{review.message}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-zinc-950 font-bold text-sm">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{review.name}</div>
                    <div className="text-zinc-600 text-xs">Verified Client</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Share Your Experience</h3>
                <p className="text-zinc-500 text-sm">Your review helps us grow</p>
              </div>
            </div>

            {submitted && (
              <div className="mb-5 p-4 bg-green-900/30 border border-green-700 rounded-xl text-green-400 text-sm flex items-center gap-2">
                <Star className="w-4 h-4 flex-shrink-0 fill-green-400" />
                Thank you for your review! It's been posted successfully.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Your Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Rating *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onMouseEnter={() => setHover(s)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(s)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          s <= (hover || rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-zinc-400 text-sm self-center">
                    {rating} / 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Your Review *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your experience with MZ Visuals..."
                  rows={4}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-800 text-zinc-950 font-bold py-3 rounded-xl transition-all"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
