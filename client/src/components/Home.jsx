import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const games = [
  { name: 'Tic Tac Toe', route: '/game/tictactoe', img: '/tictactoe.svg', emoji: '❌' },
  { name: 'Rock Paper Scissors', route: '/game/rps', img: '/rps.svg', emoji: '✊' },
  { name: 'Memory Match', route: '/game/memory', img: '/memory.svg', emoji: '🧠' },
  { name: 'Puzzle', route: '/game/puzzle', img: '/puzzle.svg', emoji: '🧩' },
];

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  return (
    <motion.nav
      className="w-full flex justify-between items-center px-8 py-4 bg-white/80 shadow-lg fixed top-0 left-0 z-50 backdrop-blur-md"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">🍃</span>
        <span className="text-2xl font-bold text-green-700 tracking-wide">Mindease</span>
      </div>
      <div className="flex gap-4">
        <motion.button
          className="text-lg px-5 py-2 rounded-full bg-blue-200 hover:bg-blue-300 transition font-semibold shadow"
          whileHover={{ scale: 1.08 }}
          onClick={() => navigate('/dashboard')}
        >
          📅 Dashboard
        </motion.button>
        <motion.button
          className="text-lg px-5 py-2 rounded-full bg-red-200 hover:bg-red-300 transition font-semibold shadow"
          whileHover={{ scale: 1.08 }}
          onClick={onLogout}
        >
          🚪 Log Out
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-blue-200 flex flex-col items-center pt-28 relative overflow-hidden">
      
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 bg-green-200 rounded-full opacity-40"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-20 left-10 w-28 h-14 bg-blue-200 rounded-full opacity-30"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Navbar onLogout={handleLogout} />

      <motion.h1
        className="text-4xl font-extrabold mb-10 mt-8 text-green-700 flex items-center gap-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span>🎮</span> Choose a Game to Relax
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {games.map(game => (
          <motion.div
            key={game.name}
            className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center cursor-pointer hover:scale-105 transition border-2 border-blue-100"
            whileHover={{ scale: 1.09, boxShadow: "0px 8px 24px rgba(0,0,0,0.14)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(game.route)}
          >
            <motion.span
              className="text-5xl mb-2"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              {game.emoji}
            </motion.span>
            
            <span className="font-semibold text-lg text-blue-700">{game.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
