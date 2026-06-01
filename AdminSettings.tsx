import { useEffect, useState } from 'react';
import { Settings, Save, Globe, Type, AlignLeft } from 'lucide-react';
import { store } from '../../store/localStore';

interface SettingsData {
  id?: string;
  instagramLink: string;
  heroTitle: string;
  heroSubtitle: string;
}

const defaultSettings: SettingsData = {
  instagramLink: '',
  heroTitle: 'Visual Storytelling That Moves',
  heroSubtitle: 'We craft cinematic videos, reels & brand content that captivate your audience.',
};

export default function AdminSettings() {
  const [form, setForm] = useState<SettingsData>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const unsub = store.subscribeDoc<SettingsData>('settings', (d) => {
      if (d) {
        setForm({
          instagramLink: d.instagramLink || '',
          heroTitle: d.heroTitle || defaultSettings.heroTitle,
          heroSubtitle: d.heroSubtitle || defaultSettings.heroSubtitle,
        });
      }
    });
    return unsub;
  }, []);

  const update = (key: keyof SettingsData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 300));

      store.setDoc('settings', {
        instagramLink: form.instagramLink.trim(),
        heroTitle: form.heroTitle.trim(),
        heroSubtitle: form.heroSubtitle.trim(),
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Error saving settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-white font-bold text-xl">Website Settings</h2>
        <p className="text-zinc-500 text-sm">Manage your website content and links</p>
      </div>

      {saved && (
        <div className="p-4 bg-green-900/30 border border-green-700 rounded-xl text-green-400 text-sm flex items-center gap-2">
          <Save className="w-4 h-4" />
          Settings saved and applied to website instantly!
        </div>
      )}

      {/* Social Links */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <Globe className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Social Media Links</h3>
            <p className="text-zinc-500 text-xs">These links appear on your website footer and contact section</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-1.5">
              <span className="text-pink-400">📸</span> Instagram Profile URL
            </label>
            <input
              type="url"
              value={form.instagramLink}
              onChange={(e) => update('instagramLink', e.target.value)}
              placeholder="https://www.instagram.com/mzvisuals"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
            />
            <p className="text-zinc-600 text-xs mt-1.5">Enter the full Instagram profile URL</p>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <Type className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Hero Section Content</h3>
            <p className="text-zinc-500 text-xs">The main heading and subtitle on your homepage</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> Hero Title
            </label>
            <input
              type="text"
              value={form.heroTitle}
              onChange={(e) => update('heroTitle', e.target.value)}
              placeholder="Visual Storytelling That Moves"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
            />
            <p className="text-zinc-600 text-xs mt-1.5">The last word will be highlighted in gold</p>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5" /> Hero Subtitle
            </label>
            <textarea
              value={form.heroSubtitle}
              onChange={(e) => update('heroSubtitle', e.target.value)}
              placeholder="We craft cinematic videos, reels & brand content..."
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm resize-none"
            />
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <Settings className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Admin Account Info</h3>
            <p className="text-zinc-500 text-xs">Login credentials reference</p>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Admin Username', val: 'mzvisualsadmin' },
            { label: 'Admin Password', val: '••••••••••' },
            { label: 'Secret Code', val: '••••••••••' },
          ].map(({ label, val }) => (
            <div key={label} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
              <span className="text-zinc-400 text-sm">{label}</span>
              <span className="text-white text-sm font-mono">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-800 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-all"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        Save Settings
      </button>
    </div>
  );
}
