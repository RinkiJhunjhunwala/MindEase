import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const emojiList = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒'];
const cardsData = [...emojiList, ...emojiList].map((emoji, i) => ({
  id: i,
  emoji,
  matched: false,
}));

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

export default function MemoryMatch() {
  const [cards, setCards] = useState(shuffle(cardsData));
  const [flipped, setFlipped] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [status, setStatus] = useState('Choose two cards');
  const [gameOver, setGameOver] = useState(false);
  const [lock, setLock] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (flipped.length === 2) {
      setLock(true);
      const [first, second] = flipped;
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          setMatchedIds(ids => [...ids, cards[first].id, cards[second].id]);
          setFlipped([]);
          setStatus('🎉 Matched!');
          setLock(false);
        }, 700);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setStatus('❌ Try again!');
          setLock(false);
        }, 900);
      }
    } else if (flipped.length === 1) {
      setStatus('Choose one more card');
    } else if (!gameOver) {
      setStatus('Choose two cards');
    }
  }, [flipped, cards, gameOver]);

  useEffect(() => {
    if (matchedIds.length === cards.length && cards.length > 0) {
      setGameOver(true);
      setStatus('🏆 You matched all pairs!');
    }
  }, [matchedIds, cards]);

  const handleCardClick = idx => {
    if (lock || flipped.includes(idx) || matchedIds.includes(cards[idx].id) || flipped.length === 2) return;
    setFlipped([...flipped, idx]);
  };

  const handleRestart = () => {
    setCards(shuffle(cardsData));
    setFlipped([]);
    setMatchedIds([]);
    setGameOver(false);
    setStatus('Choose two cards');
    setLock(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-blue-200 flex flex-col items-center pt-28 relative overflow-hidden">
      
      <motion.div
        className="absolute top-8 left-8 w-32 h-16 bg-white rounded-full opacity-30"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-48 h-24 bg-green-200 rounded-full opacity-30"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Navbar onLogout={handleLogout} />

      <motion.div
        className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-green-700 mb-2 flex items-center gap-2">
          <span>🧠</span> Memory Match <span>🍒</span>
        </h2>
        <AnimatePresence>
          <motion.div
            key={status}
            className={`text-xl font-semibold mb-6 ${
              status.includes('Matched') || status.includes('all pairs') ? 'text-green-600'
                : status.includes('Try') ? 'text-red-500'
                : 'text-gray-700'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {status}
          </motion.div>
        </AnimatePresence>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map((card, idx) => {
            const isFlipped = flipped.includes(idx) || matchedIds.includes(card.id);
            return (
              <motion.button
                key={idx}
                className={`w-20 h-28 md:w-24 md:h-32 rounded-2xl shadow-xl text-4xl md:text-5xl font-extrabold flex items-center justify-center bg-blue-100 transition-all duration-300 ${
                  isFlipped ? 'bg-white border-2 border-green-300 scale-105' : 'bg-blue-200 hover:bg-blue-300'
                }`}
                style={{ perspective: 600 }}
                whileTap={isFlipped ? {} : { scale: 0.93 }}
                onClick={() => handleCardClick(idx)}
                disabled={isFlipped || lock || gameOver}
                aria-label={isFlipped ? card.emoji : 'Hidden card'}
              >
                <span>
                  {isFlipped ? card.emoji : '❔'}
                </span>
              </motion.button>
            );
          })}
        </div>
        <motion.button
          className="mt-2 w-full py-3 bg-green-400 text-white rounded-xl font-semibold shadow hover:bg-green-500 transition text-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleRestart}
        >
          🔄 Restart Game
        </motion.button>
      </motion.div>
    </div>
  );
}
