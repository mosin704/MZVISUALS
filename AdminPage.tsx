import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Film, Users, Star, Briefcase, Settings,
  LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminVideos from '../components/admin/AdminVideos';
import AdminClients from '../components/admin/AdminClients';
import AdminReviews from '../components/admin/AdminReviews';
import AdminHiring from '../components/admin/AdminHiring';
import AdminSettings from '../components/admin/AdminSettings';

type Tab = 'dashboard' | 'videos' | 'clients' | 'reviews' | 'hiring' | 'settings';

const navItems = [
  { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'videos' as Tab, label: 'Videos', icon: Film },
  { id: 'clients' as Tab, label: 'Clients', icon: Users },
  { id: 'reviews' as Tab, label: 'Reviews', icon: Star },
  { id: 'hiring' as Tab, label: 'Hiring', icon: Briefcase },
  { id: 'settings' as Tab, label: 'Settings', icon: Settings },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'videos': return <AdminVideos />;
      case 'clients': return <AdminClients />;
      case 'reviews': return <AdminReviews />;
      case 'hiring': return <AdminHiring />;
      case 'settings': return <AdminSettings />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Film className="w-4 h-4 text-zinc-950" />
            </div>
            <div>
              <span className="text-white font-bold text-sm">MZ Visuals</span>
              <p className="text-zinc-500 text-xs">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-zinc-500 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-amber-500 text-zinc-950'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            View Website
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-zinc-900 border-b border-zinc-800 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-zinc-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg capitalize">
                {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-zinc-500 text-xs hidden sm:block">MZ Visuals Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-xs font-medium">Admin Active</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
