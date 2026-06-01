import { useEffect, useState } from 'react';
import { Users, Mail, Phone, Briefcase, DollarSign, MessageSquare, Trash2, Eye, X, Search } from 'lucide-react';
import { store } from '../../store/localStore';
import { Client } from '../../types';

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  contacted: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'in-progress': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-400 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selected, setSelected] = useState<Client | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = store.subscribe<Client>('clients', setClients);
    return unsub;
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this client inquiry?')) return;
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 200));
      store.delete('clients', id);
      if (selected?.id === id) setSelected(null);
      alert('Client deleted successfully!');
    } catch {
      alert('Error deleting client.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 200));
      store.update('clients', id, { status });
      if (selected?.id === id) {
        setSelected((prev) => prev ? { ...prev, status } : null);
      }
    } catch {
      alert('Error updating status.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = clients.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.project?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h2 className="text-white font-bold text-xl">Client Inquiries</h2>
          <p className="text-zinc-500 text-sm">{clients.length} total inquiries</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors text-sm"
          />
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
          <Users className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500">{search ? 'No clients match your search.' : 'No client inquiries yet.'}</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-500 text-xs font-medium px-5 py-4 uppercase tracking-wider">Client</th>
                  <th className="text-left text-zinc-500 text-xs font-medium px-5 py-4 uppercase tracking-wider hidden md:table-cell">Project</th>
                  <th className="text-left text-zinc-500 text-xs font-medium px-5 py-4 uppercase tracking-wider hidden lg:table-cell">Budget</th>
                  <th className="text-left text-zinc-500 text-xs font-medium px-5 py-4 uppercase tracking-wider">Status</th>
                  <th className="text-right text-zinc-500 text-xs font-medium px-5 py-4 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">
                          {c.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{c.name}</div>
                          <div className="text-zinc-500 text-xs">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="text-zinc-300 text-sm">{c.project || '—'}</div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="text-zinc-300 text-sm">{c.budget || '—'}</div>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={c.status || 'new'}
                        onChange={(e) => handleStatusUpdate(c.id, e.target.value)}
                        disabled={loading}
                        className={`text-xs font-medium px-2 py-1 rounded-full border bg-transparent focus:outline-none cursor-pointer ${statusColors[c.status] || statusColors.new}`}
                      >
                        <option value="new" className="bg-zinc-900">New</option>
                        <option value="contacted" className="bg-zinc-900">Contacted</option>
                        <option value="in-progress" className="bg-zinc-900">In Progress</option>
                        <option value="completed" className="bg-zinc-900">Completed</option>
                        <option value="rejected" className="bg-zinc-900">Rejected</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelected(c)}
                          className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={loading}
                          className="flex items-center gap-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-800/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                  {selected.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-bold">{selected.name}</h3>
                  <p className="text-zinc-500 text-sm">Client Details</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { icon: Mail, label: 'Email', val: selected.email },
                { icon: Phone, label: 'WhatsApp', val: selected.whatsapp },
                { icon: Briefcase, label: 'Project', val: selected.project },
                { icon: DollarSign, label: 'Budget', val: selected.budget },
              ].map(({ icon: Icon, label, val }) => val ? (
                <div key={label} className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl">
                  <Icon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-zinc-500 text-xs">{label}</div>
                    <div className="text-white text-sm">{val}</div>
                  </div>
                </div>
              ) : null)}

              {selected.description && (
                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl">
                  <MessageSquare className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-zinc-500 text-xs">Description</div>
                    <div className="text-white text-sm leading-relaxed">{selected.description}</div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {['new', 'contacted', 'in-progress', 'completed'].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusUpdate(selected.id, s)}
                    disabled={loading}
                    className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-colors capitalize ${
                      selected.status === s
                        ? 'bg-amber-500 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
