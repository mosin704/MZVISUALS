import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, Film, Link, Play } from 'lucide-react';
import { store } from '../../store/localStore';
import { Video } from '../../types';
import { getEmbedUrl, getThumbnailUrl } from '../../utils/videoEmbed';

interface VideoForm {
  title: string;
  description: string;
  link: string;
  category: string;
}

const emptyForm: VideoForm = { title: '', description: '', link: '', category: '' };

const categories = ['Brand Film', 'Reel', 'Commercial', 'Event', 'Short Film', 'Music Video', 'Other'];

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [form, setForm] = useState<VideoForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null);

  useEffect(() => {
    const unsub = store.subscribe<Video>('videos', setVideos);
    return unsub;
  }, []);

  const update = (key: keyof VideoForm, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.link.trim()) {
      alert('Please enter a title and video link.');
      return;
    }

    const embedUrl = getEmbedUrl(form.link.trim());
    if (!embedUrl) {
      alert('Invalid video link. Please enter a valid YouTube or Vimeo URL.');
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300));

      if (editId) {
        store.update('videos', editId, {
          title: form.title.trim(),
          description: form.description.trim(),
          link: form.link.trim(),
          embedUrl,
          category: form.category,
        });
        alert('Video updated successfully!');
      } else {
        store.add('videos', {
          title: form.title.trim(),
          description: form.description.trim(),
          link: form.link.trim(),
          embedUrl,
          category: form.category,
        });
        alert('Video added successfully!');
      }

      resetForm();
    } catch {
      alert('Error saving video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (v: Video) => {
    setForm({ title: v.title, description: v.description, link: v.link, category: v.category || '' });
    setEditId(v.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 200));
      store.delete('videos', id);
      alert('Video deleted successfully!');
    } catch {
      alert('Error deleting video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-xl">Manage Videos</h2>
          <p className="text-zinc-500 text-sm">{videos.length} videos in portfolio</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold text-base">
              {editId ? 'Edit Video' : 'Add New Video'}
            </h3>
            <button onClick={resetForm} className="text-zinc-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Video Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update('title', e.target.value)}
                  placeholder="e.g. Brand Story - Fashion House"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => update('category', e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-zinc-800">{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5" /> Video Link * (YouTube / Vimeo)
              </label>
              <input
                type="url"
                value={form.link}
                onChange={(e) => update('link', e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Brief description of this video..."
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-800 text-zinc-950 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {editId ? 'Update Video' : 'Save Video'}
              </button>
              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Videos list */}
      {videos.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
          <Film className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500">No videos added yet. Click "Add Video" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v) => {
            const thumb = getThumbnailUrl(v.embedUrl);
            return (
              <div key={v.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group">
                {/* Thumbnail */}
                <div className="relative aspect-video">
                  {thumb ? (
                    <img src={thumb} alt={v.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                      <Film className="w-10 h-10 text-zinc-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPreviewVideo(v)}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                    >
                      <Play className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                  {v.category && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-zinc-950 text-xs font-bold px-2 py-0.5 rounded-md">
                      {v.category}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{v.title}</h3>
                  {v.description && (
                    <p className="text-zinc-500 text-xs line-clamp-2 mb-3">{v.description}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(v)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v.id)}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 border border-red-800/30 px-3 py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setPreviewVideo(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 font-bold"
            >
              ✕ Close
            </button>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src={`${previewVideo.embedUrl}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
