import { useState } from 'react';
import { Briefcase, Send, Users, Camera, Film, Edit3, ChevronDown } from 'lucide-react';
import { store } from '../store/localStore';

const roles = [
  'Cinematographer',
  'Video Editor',
  'Motion Graphics Artist',
  'Director',
  'Social Media Manager',
  'Color Grader',
  'Scriptwriter',
  'Other',
];

const openings = [
  {
    icon: Camera,
    title: 'Senior Cinematographer',
    type: 'Full-time',
    desc: 'Looking for an experienced cinematographer with a strong visual eye and 3+ years in commercial production.',
  },
  {
    icon: Edit3,
    title: 'Video Editor',
    type: 'Full-time / Remote',
    desc: 'Expert in Premiere Pro & After Effects to cut cinematic brand films and social media content.',
  },
  {
    icon: Film,
    title: 'Motion Graphics Artist',
    type: 'Freelance',
    desc: 'Creative motion designer to bring our visuals to life with stunning animations and effects.',
  },
];

export default function HiringSection() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    portfolio: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSubmit = async () => {
    if (!form.fullName.trim() || !form.email.trim() || !form.role) {
      alert('Please fill in your name, email, and role.');
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 400));

      store.add('applications', {
        ...form,
        status: 'pending',
      });

      setSubmitted(true);
      setForm({ fullName: '', email: '', phone: '', role: '', experience: '', portfolio: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hiring" className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-4">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Join Our Team</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Work With the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Best
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            We're always looking for talented visionaries to join our growing team.
          </p>
        </div>

        {/* Job openings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {openings.map((job) => (
            <div key={job.title} className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 hover:border-amber-500/30 transition-all">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center mb-4">
                <job.icon className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-white font-bold text-base mb-1">{job.title}</h3>
              <span className="inline-block text-amber-400 text-xs font-medium bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5 mb-3">
                {job.type}
              </span>
              <p className="text-zinc-400 text-sm leading-relaxed">{job.desc}</p>
            </div>
          ))}
        </div>

        {/* Application form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Apply Now</h3>
                <p className="text-zinc-500 text-sm">Submit your application below</p>
              </div>
            </div>

            {submitted && (
              <div className="mb-5 p-4 bg-green-900/30 border border-green-700 rounded-xl text-green-400 text-sm">
                ✅ Application submitted! We'll review it and get back to you soon.
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    placeholder="John Smith"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@email.com"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+1 234 567 8900"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Applying For *</label>
                  <div className="relative">
                    <select
                      value={form.role}
                      onChange={(e) => update('role', e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                    >
                      <option value="" className="text-zinc-600">Select a role</option>
                      {roles.map((r) => (
                        <option key={r} value={r} className="bg-zinc-800">{r}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Years of Experience</label>
                <input
                  type="text"
                  value={form.experience}
                  onChange={(e) => update('experience', e.target.value)}
                  placeholder="e.g. 3 years"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Portfolio / Reel Link</label>
                <input
                  type="url"
                  value={form.portfolio}
                  onChange={(e) => update('portfolio', e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Why do you want to join us?</label>
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Tell us a bit about yourself and why you'd be a great fit..."
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
                    Submit Application
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
