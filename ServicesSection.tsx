import { Film, Smartphone, Monitor, Camera, Palette, Music } from 'lucide-react';

const services = [
  {
    icon: Film,
    title: 'Brand Films',
    desc: 'Cinematic storytelling that captures your brand\'s essence and connects emotionally with your audience.',
    color: 'from-blue-600 to-blue-700',
    bg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: Smartphone,
    title: 'Social Media Reels',
    desc: 'High-impact short-form videos optimized for Instagram, TikTok, and YouTube Shorts.',
    color: 'from-pink-600 to-pink-700',
    bg: 'bg-pink-500/10',
    iconColor: 'text-pink-400',
  },
  {
    icon: Monitor,
    title: 'Commercials & Ads',
    desc: 'Compelling commercial productions that drive conversions and leave a lasting impression.',
    color: 'from-amber-600 to-amber-700',
    bg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
  },
  {
    icon: Camera,
    title: 'Event Coverage',
    desc: 'Professional event videography that captures every important moment with cinematic flair.',
    color: 'from-green-600 to-green-700',
    bg: 'bg-green-500/10',
    iconColor: 'text-green-400',
  },
  {
    icon: Palette,
    title: 'Motion Graphics',
    desc: 'Stunning animated graphics and visual effects that elevate your video content.',
    color: 'from-purple-600 to-purple-700',
    bg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
  },
  {
    icon: Music,
    title: 'Music Videos',
    desc: 'Creative and visually stunning music video productions that amplify your artistic vision.',
    color: 'from-red-600 to-red-700',
    bg: 'bg-red-500/10',
    iconColor: 'text-red-400',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-4">
            <Film className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">What We Do</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Services
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            From concept to final cut — we handle every aspect of visual content creation.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-6 hover:border-amber-500/30 hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <s.icon className={`w-6 h-6 ${s.iconColor}`} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">
                {s.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-4 rounded-xl transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
          >
            Start a Project
          </button>
        </div>
      </div>
    </section>
  );
}
