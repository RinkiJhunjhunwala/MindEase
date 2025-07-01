import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const size = 3;
const solved = Array.from({ length: size * size }, (_, i) => (i + 1) % (size * size));

function shuffle(arr) {
  let array = arr.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  if (array.join() === solved.join()) return shuffle(array);
  return array;
}

function isSolvable(puzzle) {
  
  let inv = 0;
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] && puzzle[j] && puzzle[i] > puzzle[j]) inv++;
    }
  }
  return inv % 2 === 0;
}

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
          onClick={() => navigate('/home')}
        >
          🏠 Home
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

export default function Puzzle() {
  const [tiles, setTiles] = useState(() => {
    let arr;
    do {
      arr = shuffle(solved);
    } while (!isSolvable(arr));
    return arr;
  });
  const [status, setStatus] = useState('Arrange the tiles!');
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  const moveTile = idx => {
    if (gameOver) return;
    const emptyIdx = tiles.indexOf(0);
    const row = Math.floor(idx / size), col = idx % size;
    const emptyRow = Math.floor(emptyIdx / size), emptyCol = emptyIdx % size;
    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      const newTiles = tiles.slice();
      [newTiles[idx], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[idx]];
      setTiles(newTiles);
      if (newTiles.join() === solved.join()) {
        setStatus('🏆 You solved it!');
        setGameOver(true);
      }
    }
  };

  const handleRestart = () => {
    let arr;
    do {
      arr = shuffle(solved);
    } while (!isSolvable(arr));
    setTiles(arr);
    setStatus('Arrange the tiles!');
    setGameOver(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-blue-200 flex flex-col items-center pt-28 relative overflow-hidden">
      
      <motion.div
        className="absolute top-8 left-8 w-28 h-12 bg-white rounded-full opacity-30"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-16 bg-green-200 rounded-full opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Navbar onLogout={handleLogout} />

      <motion.div
        className="w-full max-w-xs bg-white/90 rounded-3xl shadow-2xl p-6 flex flex-col items-center mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-green-700 mb-2 flex items-center gap-2">
          <span>🧩</span> Puzzle Game
        </h2>
        <AnimatePresence>
          <motion.div
            key={status}
            className={`text-lg font-semibold mb-4 ${
              status.includes('solved') ? 'text-green-600' : 'text-gray-700'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {status}
          </motion.div>
        </AnimatePresence>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {tiles.map((val, idx) => (
            <motion.button
              key={idx}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-xl shadow-lg text-2xl md:text-3xl font-extrabold flex items-center justify-center transition-all duration-200 ${
                val === 0 ? 'bg-blue-100 text-blue-100 cursor-default' : 'bg-blue-200 hover:bg-blue-300 cursor-pointer'
              }`}
              whileTap={val !== 0 && !gameOver ? { scale: 0.93 } : {}}
              onClick={() => moveTile(idx)}
              disabled={val === 0 || gameOver}
              aria-label={val === 0 ? 'Empty' : `Tile ${val}`}
            >
              {val === 0 ? '⬜️' : val}
            </motion.button>
          ))}
        </div>
        <motion.button
          className="mt-2 w-full py-2 bg-green-400 text-white rounded-xl font-semibold shadow hover:bg-green-500 transition text-base"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleRestart}
        >
          🔄 Restart Puzzle
        </motion.button>
      </motion.div>
    </div>
  );
}
