
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      alert('Registration successful! Please login.');
      navigate('/');
    } catch {
      alert('Registration failed. User may already exist.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-green-200 relative overflow-hidden">
      {/* Animated background leaf */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-20 bg-green-100 rounded-full opacity-40"
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-56 h-28 bg-blue-200 rounded-full opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 flex flex-col items-center">
          <span className="text-5xl">☁️</span>
          <h2 className="text-2xl font-bold text-blue-700 mt-2">Create Account</h2>
          <p className="text-gray-500 mt-1">Join MindEase for a calmer mind</p>
        </div>
        <form className="w-full space-y-4" onSubmit={handleRegister} autoComplete="off">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Username</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-blue-200 focus:border-blue-400 focus:outline-none transition"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-blue-200 focus:border-blue-400 focus:outline-none transition"
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
              className="w-full px-4 py-2 rounded-xl border border-blue-200 focus:border-blue-400 focus:outline-none transition"
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
            className="w-full py-2 bg-blue-400 text-white rounded-xl font-semibold shadow hover:bg-blue-500 transition"
            type="submit"
          >
            Register
          </motion.button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <button
            className="text-green-500 underline"
            onClick={() => navigate('/')}
          >
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}
