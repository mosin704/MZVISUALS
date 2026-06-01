import { CheckCircle, Award, Users, Zap } from 'lucide-react';

const features = [
  { icon: CheckCircle, title: 'Cinematic Quality', desc: 'Every frame crafted with precision and artistic vision.' },
  { icon: Award, title: 'Award Winning', desc: 'Recognized for excellence in visual storytelling.' },
  { icon: Users, title: 'Dedicated Team', desc: 'A passionate crew of directors, editors & cinematographers.' },
  { icon: Zap, title: 'Fast Turnaround', desc: 'Quick delivery without compromising quality.' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10">
              <img
                src="/about-img.jpg"
                alt="MZ Visuals Team"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl">5+ Years</div>
                  <div className="text-zinc-400 text-sm">in Visual Production</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-amber-500/20 rounded-2xl" />
            <div className="absolute -top-3 -left-3 w-24 h-24 border border-amber-500/10 rounded-2xl" />
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
              <span className="text-amber-400 text-sm font-medium">About MZ Visuals</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              We Don't Just Create{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Content
              </span>
              {' '}We Create Impact
            </h2>

            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              MZ Visuals Agency is a premium visual production studio specializing in cinematic brand films,
              social media reels, commercials, and event coverage. We blend artistry with strategy to create
              content that doesn't just look good — it converts.
            </p>

            <p className="text-zinc-400 text-base mb-10 leading-relaxed">
              From concept to final cut, we handle every aspect of your visual narrative. Our team of
              experienced cinematographers, editors, and creative directors work tirelessly to bring your
              vision to life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{f.title}</div>
                    <div className="text-zinc-500 text-sm mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
