import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Lock, User, KeyRound, LogIn, Film } from 'lucide-react';

const SECRET_CODE = 'arise@#%$123';
const ADMIN_USER = 'mzvisualsadmin';
const ADMIN_PASS = 'Mosin@#%786';
import { useAuth } from "../context/AuthContext";
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

  const handleSecretLogin = async () => {
    setError('');
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 400));

      if (secretCode.trim() === SECRET_CODE) {
        login('user');
        navigate('/');
      } else {
        setError('Invalid secret code. Please try again.');
      }
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
        login('admin');
        navigate('/admin');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <Film className="w-10 h-10 text-amber-500 mx-auto" />
          <h1 className="text-white text-2xl font-bold mt-2">MZ Visuals</h1>
        </div>

        {/* Mode */}
        <div className="flex mb-6 bg-zinc-800 p-1 rounded-lg">
          <button
            onClick={() => setMode('admin')}
            className={`flex-1 py-2 rounded ${mode === 'admin' ? 'bg-amber-500 text-black' : 'text-white'}`}
          >
            Admin
          </button>
          <button
            onClick={() => setMode('secret')}
            className={`flex-1 py-2 rounded ${mode === 'secret' ? 'bg-amber-500 text-black' : 'text-white'}`}
          >
            Secret
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        {mode === 'admin' ? (
          <div>
            <input
              className="w-full p-2 mb-3 bg-zinc-800 text-white"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-full p-2 mb-3 bg-zinc-800 text-white"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleAdminLogin}
              className="w-full bg-amber-500 py-2"
            >
              Login Admin
            </button>
          </div>
        ) : (
          <div>
            <input
              className="w-full p-2 mb-3 bg-zinc-800 text-white"
              type={showSecret ? "text" : "password"}
              placeholder="Secret Code"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
            />

            <button
              onClick={() => setShowSecret(!showSecret)}
              className="text-sm text-gray-400 mb-3"
            >
              Toggle Show
            </button>

            <button
              onClick={handleSecretLogin}
              className="w-full bg-amber-500 py-2"
            >
              Access
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
