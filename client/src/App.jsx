import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import TicTacToe from './components/Games/TicTacToe';
import MemoryMatch from './components/Games/MemoryMatch';
import SimonSays from './components/Games/SimonSays';
import Puzzle from './components/Games/Puzzle';
import RPS from './components/games/RockPaperScissors';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game/tictactoe" element={<TicTacToe />} />
        <Route path="/game/memory" element={<MemoryMatch />} />
        <Route path="/game/simon" element={<SimonSays />} />
        <Route path="/game/puzzle" element={<Puzzle />} />
        <Route path="/game/rps" element={<RPS />} />
        
      </Routes>
    </BrowserRouter>
  );
}
