import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const choices = [
  { name: 'Rock', emoji: '✊' },
  { name: 'Paper', emoji: '✋' },
  { name: 'Scissors', emoji: '✌️' },
];

function getWinner(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'Rock' && computer === 'Scissors') ||
    (player === 'Paper' && computer === 'Rock') ||
    (player === 'Scissors' && computer === 'Paper')
  ) return 'player';
  return 'computer';
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

export default function RPS() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const handlePlayerChoice = choice => {
    if (playerChoice) return;
    const comp = choices[Math.floor(Math.random() * 3)].name;
    setPlayerChoice(choice.name);
    setComputerChoice(comp);

    const winner = getWinner(choice.name, comp);
    setResult(
      winner === 'player'
        ? '🎉 You win!'
        : winner === 'computer'
        ? '🤖 Computer wins!'
        : "It's a draw!"
    );
  };

  const handleRestart = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
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
        className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-green-700 mb-2 flex items-center gap-2">
          <span>✊</span> Rock Paper Scissors <span>✌️</span>
        </h2>
        <div className="text-xl font-semibold mb-6 text-gray-700">
          {playerChoice ? "Result" : "Choose"}
        </div>
        <div className="flex justify-center gap-6 mb-6">
          {choices.map(choice => (
            <motion.button
              key={choice.name}
              className={`text-5xl p-4 rounded-full border-2 font-bold bg-blue-100 hover:bg-blue-200 transition shadow-lg ${
                playerChoice === choice.name ? 'border-blue-500 scale-110' : 'border-transparent'
              }`}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.15 }}
              onClick={() => handlePlayerChoice(choice)}
              disabled={!!playerChoice}
              aria-label={choice.name}
            >
              {choice.emoji}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {playerChoice && (
            <motion.div
              className="flex justify-between w-full mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col items-center w-1/2">
                <span className="text-lg font-semibold text-gray-600 mb-1">You</span>
                <span className="text-4xl h-12">
                  {choices.find(c => c.name === playerChoice).emoji}
                </span>
              </div>
              <div className="flex flex-col items-center w-1/2">
                <span className="text-lg font-semibold text-gray-600 mb-1">Computer</span>
                <span className="text-4xl h-12">
                  {choices.find(c => c.name === computerChoice).emoji}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {result && (
            <motion.div
              className={`text-xl font-semibold mb-4 ${
                result.includes('win') ? 'text-green-600' : result.includes('draw') ? 'text-blue-600' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {result}
            </motion.div>
          )}
        </AnimatePresence>
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
