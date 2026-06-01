import { useEffect, useState } from 'react';
import { Film, Heart, ExternalLink } from 'lucide-react';
import { store } from '../store/localStore';
import { Settings } from '../types';

export default function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const unsub = store.subscribeDoc<Settings>('settings', (d) => {
      if (d) setSettings(d as Settings);
    });
    return unsub;
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Film className="w-5 h-5 text-zinc-950" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                MZ <span className="text-amber-400">Visuals</span>
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Premium visual production agency crafting cinematic content that elevates brands and captivates audiences.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {settings?.instagramLink && (
                <a
                  href={settings.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Instagram
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Our Work', href: '#work' },
                { label: 'About Us', href: '#about' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'Hire Us', href: '#hiring' },
                { label: 'Contact', href: '#contact' },
              ].map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-zinc-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {[
                'Brand Films',
                'Social Media Reels',
                'Commercials',
                'Event Coverage',
                'Motion Graphics',
                'Color Grading',
              ].map((s) => (
                <li key={s} className="text-zinc-400 text-sm">{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} MZ Visuals Agency. All rights reserved.
          </p>
          <p className="text-zinc-600 text-sm flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> by MZ Visuals
          </p>
        </div>
      </div>
    </footer>
  );
}
