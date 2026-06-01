import { useEffect, useState } from 'react';
import { Star, Trash2, MessageSquare } from 'lucide-react';
import { store } from '../../store/localStore';
import { Review } from '../../types';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = store.subscribe<Review>('reviews', setReviews);
    return unsub;
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 200));
      store.delete('reviews', id);
      alert('Review deleted successfully!');
    } catch {
      alert('Error deleting review.');
    } finally {
      setLoading(false);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-xl">Client Reviews</h2>
          <p className="text-zinc-500 text-sm">{reviews.length} reviews · Avg {avgRating} ★</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-white font-bold">{avgRating}</span>
          <span className="text-zinc-500 text-sm">/ 5</span>
        </div>
      </div>

      {/* Rating distribution */}
      {reviews.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold text-sm mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const pct = reviews.length ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12 flex-shrink-0">
                    <span className="text-zinc-400 text-xs">{star}</span>
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-zinc-500 text-xs w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
          <MessageSquare className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500">No reviews yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(r.id)}
                  disabled={loading}
                  className="text-zinc-600 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-4 line-clamp-4">"{r.message}"</p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">
                  {r.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{r.name}</div>
                  <div className="text-zinc-600 text-xs">
                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recently'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
