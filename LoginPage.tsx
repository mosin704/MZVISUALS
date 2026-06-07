import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import { Eye, EyeOff, Lock, User, KeyRound, LogIn, Film } from 'lucide-react';

const SECRET_CODE = 'arise@#%$123';
const ADMIN_USER = 'mzvisualsadmin';
const ADMIN_PASS = 'Mosin@#%786';

type LoginMode = 'secret' | 'admin';

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode>('admin');
  const [secretCode, setSecretCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const logAttempt = (success: boolean, type: string) => {
    const logs = JSON.parse(localStorage.getItem('mz_login_logs') || '[]');
    logs.unshift({
      time: new Date().toISOString(),
      type,
      success,
      ip: 'client',
    });
    localStorage.setItem('mz_login_logs', JSON.stringify(logs.slice(0, 100)));
  };

  const handleSecretLogin = async () => {
    setError('');
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 400));
      if (secretCode.trim() === SECRET_CODE) {
        logAttempt(true, 'secret');
        login('user');
        navigate('/');
      } else {
        logAttempt(false, 'secret');
        setError('Invalid secret code. Please try again.');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setError('');
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 400));
      if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
        logAttempt(true, 'admin');
        login('admin');
        navigate('/admin');
      } else {
        logAttempt(false, 'admin');
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500 rounded-full opacity-5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-600 rounded-full opacity-5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500 rounded-full opacity-3 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 mb-4 shadow-2xl shadow-amber-500/20">
            <Film className="w-8 h-8 text-zinc-950" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">MZ Visuals Agency</h1>
          <p className="text-zinc-500 text-sm mt-1">Secure Access Portal</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {/* Mode tabs */}
          <div className="flex rounded-xl bg-zinc-800 p-1 mb-6">
            <button
              onClick={() => { setMode('admin'); setError(''); }}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                mode === 'admin'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                Admin Login
              </span>
            </button>
            <button
              onClick={() => { setMode('secret'); setError(''); }}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                mode === 'secret'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <KeyRound className="w-4 h-4" />
                Secret Code
              </span>
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {mode === 'admin' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                    placeholder="Enter username"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                    placeholder="Enter password"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-10 pr-12 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleAdminLogin}
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-800 text-zinc-950 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Login as Admin
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Secret Code</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type={showSecret ? 'text' : 'password'}
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSecretLogin()}
                    placeholder="Enter secret code"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-10 pr-12 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleSecretLogin}
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-800 text-zinc-950 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-5 h-5" />
                    Access with Code
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
            <p className="text-zinc-600 text-xs">
              Protected by MZ Visuals security system
            </p>
          </div>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-4">
          © {new Date().getFullYear()} MZ Visuals Agency. All rights reserved.
        </p>
      </div>
    </div>
  );
}
