import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const emptyBoard = Array(9).fill(null);
const playerMark = '❌';
const computerMark = '⭕';

function getWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], 
    [0,3,6],[1,4,7],[2,5,8], 
    [0,4,8],[2,4,6]          
  ];
  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(Boolean)) return 'draw';
  return null;
}

function getAvailableMoves(board) {
  return board.map((val, idx) => val ? null : idx).filter(i => i !== null);
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

export default function TicTacToe() {
  const [board, setBoard] = useState(emptyBoard);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [status, setStatus] = useState('Your turn');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserTurn && !gameOver) {
      const timeout = setTimeout(() => {
        // Computer's move (random)
        const available = getAvailableMoves(board);
        if (available.length > 0) {
          const move = available[Math.floor(Math.random() * available.length)];
          const newBoard = [...board];
          newBoard[move] = computerMark;
          setBoard(newBoard);
          setIsUserTurn(true);
        }
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [isUserTurn, board, gameOver]);

  useEffect(() => {
    const result = getWinner(board);
    if (result) {
      setGameOver(true);
      setWinner(result);
      setStatus(
        result === playerMark
          ? '🎉 You win!'
          : result === computerMark
          ? '🤖 Computer wins!'
          : 'It\'s a draw!'
      );
    } else {
      setStatus(isUserTurn ? 'Your turn' : "Computer's turn");
    }
  }, [board, isUserTurn]);

  const handleCellClick = idx => {
    if (!isUserTurn || board[idx] || gameOver) return;
    const newBoard = [...board];
    newBoard[idx] = playerMark;
    setBoard(newBoard);
    setIsUserTurn(false);
  };

  const handleRestart = () => {
    setBoard(emptyBoard);
    setIsUserTurn(true);
    setGameOver(false);
    setWinner(null);
    setStatus('Your turn');
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
          <span>❌</span> Tic Tac Toe <span>⭕</span>
        </h2>
        <AnimatePresence>
          <motion.div
            key={status}
            className={`text-xl font-semibold mb-6 ${
              status.includes('win') ? 'text-green-600' : status.includes('draw') ? 'text-blue-600' : 'text-gray-700'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {status}
          </motion.div>
        </AnimatePresence>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {board.map((cell, idx) => (
            <motion.button
              key={idx}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-lg text-4xl md:text-5xl font-extrabold flex items-center justify-center bg-blue-100 hover:bg-blue-200 transition ${
                cell ? 'cursor-default' : 'cursor-pointer'
              }`}
              whileTap={cell || gameOver ? {} : { scale: 0.85 }}
              onClick={() => handleCellClick(idx)}
              disabled={!!cell || gameOver || !isUserTurn}
              aria-label={`Cell ${idx + 1}`}
            >
              {cell}
            </motion.button>
          ))}
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
