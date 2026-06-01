import { useEffect, useState } from 'react';
import { Briefcase, Mail, Phone, Link, MessageSquare, Trash2, Eye, X, Check, XCircle, Clock } from 'lucide-react';
import { store } from '../../store/localStore';
import { Application } from '../../types';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-zinc-700 text-zinc-300 border-zinc-600', icon: Clock },
  accepted: { label: 'Accepted', color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: Check },
  rejected: { label: 'Rejected', color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: XCircle },
  shortlisted: { label: 'Shortlisted', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Clock },
};

export default function AdminHiring() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = store.subscribe<Application>('applications', setApplications);
    return unsub;
  }, []);

  const handleStatusUpdate = async (id: string, status: Application['status']) => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 200));
      store.update('applications', id, { status });
      if (selected?.id === id) {
        setSelected((prev) => prev ? { ...prev, status } : null);
      }
      alert(`Application ${status}!`);
    } catch {
      alert('Error updating application status.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 200));
      store.delete('applications', id);
      if (selected?.id === id) setSelected(null);
      alert('Application deleted!');
    } catch {
      alert('Error deleting application.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === 'all' ? applications : applications.filter((a) => a.status === filter);

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    shortlisted: applications.filter((a) => a.status === 'shortlisted').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white font-bold text-xl">Job Applications</h2>
        <p className="text-zinc-500 text-sm">{applications.length} total applications</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(counts).map(([key, count]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
              filter === key
                ? 'bg-amber-500 text-zinc-950'
                : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
            }`}
          >
            {key} ({count})
          </button>
        ))}
      </div>

      {/* Applications */}
      {filtered.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
          <Briefcase className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500">No applications {filter !== 'all' ? `with status "${filter}"` : 'yet'}.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const sc = statusConfig[app.status] || statusConfig.pending;
            return (
              <div key={app.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold flex-shrink-0">
                    {app.fullName?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white font-semibold text-sm">{app.fullName}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${sc.color}`}>
                        {sc.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-zinc-500 text-xs mb-3">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{app.email}</span>
                      {app.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{app.phone}</span>}
                      {app.role && <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{app.role}</span>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelected(app)}
                        className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Details
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app.id, 'shortlisted')}
                        disabled={loading || app.status === 'shortlisted'}
                        className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        Shortlist
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app.id, 'accepted')}
                        disabled={loading || app.status === 'accepted'}
                        className="flex items-center gap-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app.id, 'rejected')}
                        disabled={loading || app.status === 'rejected'}
                        className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        disabled={loading}
                        className="flex items-center gap-1.5 bg-zinc-800/50 hover:bg-red-900/30 text-zinc-500 hover:text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  {selected.fullName?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-bold">{selected.fullName}</h3>
                  <p className="text-zinc-500 text-sm">{selected.role || 'Applicant'}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              {[
                { icon: Mail, label: 'Email', val: selected.email },
                { icon: Phone, label: 'Phone', val: selected.phone },
                { icon: Briefcase, label: 'Role', val: selected.role },
                { icon: Clock, label: 'Experience', val: selected.experience },
              ].map(({ icon: Icon, label, val }) => val ? (
                <div key={label} className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl">
                  <Icon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-zinc-500 text-xs">{label}</div>
                    <div className="text-white text-sm">{val}</div>
                  </div>
                </div>
              ) : null)}

              {selected.portfolio && (
                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl">
                  <Link className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-zinc-500 text-xs">Portfolio</div>
                    <a href={selected.portfolio} target="_blank" rel="noopener noreferrer" className="text-amber-400 text-sm hover:underline">
                      {selected.portfolio}
                    </a>
                  </div>
                </div>
              )}

              {selected.message && (
                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl">
                  <MessageSquare className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-zinc-500 text-xs">Message</div>
                    <div className="text-white text-sm leading-relaxed">{selected.message}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleStatusUpdate(selected.id, 'accepted')}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 rounded-xl transition-colors text-sm disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate(selected.id, 'shortlisted')}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-zinc-950 font-medium py-2.5 rounded-xl transition-colors text-sm disabled:opacity-50"
              >
                <Clock className="w-4 h-4" />
                Shortlist
              </button>
              <button
                onClick={() => handleStatusUpdate(selected.id, 'rejected')}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600/80 hover:bg-red-600 text-white font-medium py-2.5 rounded-xl transition-colors text-sm disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
