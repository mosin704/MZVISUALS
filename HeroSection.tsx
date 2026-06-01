import { useEffect, useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { store } from '../store/localStore';
import { Settings } from '../types';

export default function HeroSection() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [showReel, setShowReel] = useState(false);

  useEffect(() => {
    const unsub = store.subscribeDoc<Settings>('settings', (d) => {
      if (d) setSettings(d as Settings);
    });
    return unsub;
  }, []);

  const scrollDown = () => {
    const el = document.querySelector('#work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/60 to-zinc-950" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-amber-400 text-sm font-medium">Premium Visual Production Agency</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-none tracking-tight mb-6">
          {settings?.heroTitle ? (
            <>
              {settings.heroTitle.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                {settings.heroTitle.split(' ').slice(-1)[0]}
              </span>
            </>
          ) : (
            <>
              Visual Storytelling{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                That Moves
              </span>
            </>
          )}
        </h1>

        <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {settings?.heroSubtitle ||
            'We craft cinematic videos, reels & brand content that captivate your audience and elevate your brand.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-base transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
          >
            View Our Work
          </button>
          <button
            onClick={() => setShowReel(true)}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl text-base transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <Play className="w-5 h-5" />
            Watch Showreel
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '200+', label: 'Projects Done' },
            { value: '50+', label: 'Happy Clients' },
            { value: '5★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">{stat.value}</div>
              <div className="text-zinc-500 text-xs sm:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-500 hover:text-amber-400 transition-colors"
      >
        <span className="text-xs font-medium">Scroll Down</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>

      {/* Showreel Modal */}
      {showReel && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowReel(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowReel(false)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 font-bold text-lg"
            >
              ✕ Close
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              className="w-full h-full rounded-xl"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
