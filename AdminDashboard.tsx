import { useEffect, useState } from 'react';
import { Film, Users, Star, Briefcase, TrendingUp, Clock, Activity } from 'lucide-react';
import { store } from '../../store/localStore';
import { Video, Review, Client, Application } from '../../types';

export default function AdminDashboard() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const u1 = store.subscribe<Video>('videos', setVideos);
    const u2 = store.subscribe<Client>('clients', setClients);
    const u3 = store.subscribe<Review>('reviews', setReviews);
    const u4 = store.subscribe<Application>('applications', setApplications);
    return () => { u1(); u2(); u3(); u4(); };
  }, []);

  const stats = [
    { label: 'Total Videos', value: videos.length, icon: Film, color: 'from-blue-600 to-blue-700', bg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
    { label: 'Total Clients', value: clients.length, icon: Users, color: 'from-amber-600 to-amber-700', bg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
    { label: 'Total Reviews', value: reviews.length, icon: Star, color: 'from-purple-600 to-purple-700', bg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
    { label: 'Applications', value: applications.length, icon: Briefcase, color: 'from-green-600 to-green-700', bg: 'bg-green-500/10', iconColor: 'text-green-400' },
  ];

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  const pending = applications.filter((a) => a.status === 'pending').length;
  const newClients = clients.filter((c) => c.status === 'new').length;

  const loginLogs: { time: string; type: string; success: boolean }[] =
    JSON.parse(localStorage.getItem('mz_login_logs') || '[]');

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.iconColor}`} />
            </div>
            <div className="text-3xl font-black text-white mb-0.5">{s.value}</div>
            <div className="text-zinc-500 text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="text-zinc-400 text-sm">Average Rating</div>
            <div className="text-white font-black text-2xl">{avgRating} <span className="text-amber-400 text-lg">★</span></div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center">
            <Clock className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <div className="text-zinc-400 text-sm">Pending Applications</div>
            <div className="text-white font-black text-2xl">{pending}</div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center">
            <Activity className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <div className="text-zinc-400 text-sm">New Client Inquiries</div>
            <div className="text-white font-black text-2xl">{newClients}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent clients */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            Recent Clients
          </h3>
          {clients.slice(0, 5).length === 0 ? (
            <p className="text-zinc-600 text-sm text-center py-4">No client inquiries yet</p>
          ) : (
            <div className="space-y-3">
              {clients.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{c.name}</div>
                    <div className="text-zinc-500 text-xs truncate">{c.project || c.email}</div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
                    {c.status || 'new'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Login security logs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            Login Security Logs
          </h3>
          {loginLogs.length === 0 ? (
            <p className="text-zinc-600 text-sm text-center py-4">No login activity yet</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {loginLogs.slice(0, 10).map((log, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-xl">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${log.success ? 'bg-green-400' : 'bg-red-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-zinc-300 text-xs">
                      {log.success ? '✅ Successful' : '❌ Failed'} {log.type} login
                    </div>
                    <div className="text-zinc-600 text-xs">
                      {new Date(log.time).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
