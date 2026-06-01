import { useState, useEffect } from 'react';
import { Send, Mail, MessageSquare, Phone, Briefcase, DollarSign, FileText } from 'lucide-react';
import { store } from '../store/localStore';
import { Settings } from '../types';

export default function ContactSection() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    project: '',
    budget: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const unsub = store.subscribeDoc<Settings>('settings', (d) => {
      if (d) setSettings(d as Settings);
    });
    return unsub;
  }, []);

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.project.trim()) {
      alert('Please fill in your name, email, and project details.');
      return;
    }

    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 400));

      store.add('clients', {
        ...form,
        status: 'new',
      });

      setSubmitted(true);
      setForm({ name: '', email: '', whatsapp: '', project: '', budget: '', description: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-4">
            <Mail className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Get In Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Let's Create Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Amazing
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Ready to bring your vision to life? Tell us about your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">Email Us</h4>
              <p className="text-zinc-400 text-sm">hello@mzvisuals.com</p>
              <p className="text-zinc-400 text-sm">projects@mzvisuals.com</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-white font-semibold mb-1">WhatsApp</h4>
              <p className="text-zinc-400 text-sm">Available Mon–Sat</p>
              <p className="text-zinc-400 text-sm">9 AM – 7 PM (PKT)</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center mb-4">
                <span className="text-amber-400 text-xl">📸</span>
              </div>
              <h4 className="text-white font-semibold mb-1">Instagram</h4>
              {settings?.instagramLink ? (
                <a
                  href={settings.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 text-sm hover:text-amber-300 transition-colors"
                >
                  @mzvisuals
                </a>
              ) : (
                <p className="text-zinc-400 text-sm">@mzvisuals</p>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Project Inquiry</h3>
                  <p className="text-zinc-500 text-sm">Fill out the form and we'll respond within 24 hours</p>
                </div>
              </div>

              {submitted && (
                <div className="mb-5 p-4 bg-green-900/30 border border-green-700 rounded-xl text-green-400 text-sm">
                  ✅ Message sent! We'll get back to you within 24 hours.
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email *
                    </label>
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
                    <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => update('whatsapp', e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" /> Project Type *
                    </label>
                    <input
                      type="text"
                      value={form.project}
                      onChange={(e) => update('project', e.target.value)}
                      placeholder="e.g. Brand Film, Reel, Ad"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" /> Budget
                  </label>
                  <input
                    type="text"
                    value={form.budget}
                    onChange={(e) => update('budget', e.target.value)}
                    placeholder="Type your budget (e.g. $500, $2000–$5000)"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Project Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => update('description', e.target.value)}
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    rows={5}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-800 text-zinc-950 font-bold py-4 rounded-xl transition-all text-base"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Project Inquiry
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
