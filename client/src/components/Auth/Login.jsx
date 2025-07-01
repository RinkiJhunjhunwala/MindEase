
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 relative overflow-hidden">
      
      <motion.div
        className="absolute top-10 left-10 w-40 h-20 bg-white rounded-full opacity-40"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-56 h-28 bg-green-200 rounded-full opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 flex flex-col items-center">
          <span className="text-5xl">🍃</span>
          <h2 className="text-2xl font-bold text-green-700 mt-2">Welcome Back</h2>
          <p className="text-gray-500 mt-1">Login to your MindEase account</p>
        </div>
        <form className="w-full space-y-4" onSubmit={handleLogin} autoComplete="off">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-green-200 focus:border-green-400 focus:outline-none transition"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-green-200 focus:border-green-400 focus:outline-none transition"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 bg-green-400 text-white rounded-xl font-semibold shadow hover:bg-green-500 transition"
            type="submit"
          >
            Login
          </motion.button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <button
            className="text-blue-500 underline"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </motion.div>
    </div>
  );
}
