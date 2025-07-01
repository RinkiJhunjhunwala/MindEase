import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white/70 shadow-lg fixed top-0 left-0 z-50">
      <motion.div
        className="text-3xl font-bold text-green-600 flex items-center gap-2"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span>🍃</span> Mindease
      </motion.div>
      <div className="flex gap-4">
        <motion.button
          className="text-lg px-4 py-2 rounded-full bg-blue-200 hover:bg-blue-300 transition font-semibold"
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate('/home')}
        >Home</motion.button>
        <motion.button
          className="text-lg px-4 py-2 rounded-full bg-green-200 hover:bg-green-300 transition font-semibold"
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate('/dashboard')}
        >Dashboard</motion.button>
      </div>
    </nav>
  );
}
