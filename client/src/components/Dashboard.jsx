
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';

const moodEmojis = ['😔', '😐', '🙂', '😊', '😁'];
const moodLabels = ['Sad', 'Neutral', 'Okay', 'Happy', 'Great'];

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

export default function Dashboard() {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [date, setDate] = useState(new Date());
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/moods', {
          params: { token: localStorage.getItem('token') }
        });
        setMoods(res.data.moods || []);
      } catch {
        setMoods([]);
      }
    };
    fetchMoods();
  }, []);

  const handleMoodSubmit = async () => {
    if (selectedMood === null) return;
    setSaving(true);
    await axios.post('http://localhost:5000/api/user/mood', {
      token: localStorage.getItem('token'),
      date: date.toDateString(),
      mood: selectedMood,
    });
    setMoods([
      ...moods.filter(m => m.date !== date.toDateString()),
      { date: date.toDateString(), mood: selectedMood }
    ]);
    setSelectedMood(null);
    setSaving(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  
  function tileContent({ date: d }) {
    const mood = moods.find(m => m.date === d.toDateString());
    return (
      <div className="flex flex-col items-center mt-1">
        <span className="text-xs font-semibold text-gray-400">{d.getDate()}</span>
        {mood && (
          <motion.span
            className="block text-lg"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
          >
            {moodEmojis[mood.mood]}
          </motion.span>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 relative overflow-hidden pt-28 px-2">
      
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
        className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 flex flex-col items-center">
          <span className="text-5xl">🌤️</span>
          <h2 className="text-3xl font-bold text-green-700 mt-2 mb-2">Mood Calendar</h2>
          <p className="text-gray-500 text-lg">Track your daily mood with a tap!</p>
        </div>
        <Calendar
          value={date}
          onChange={setDate}
          tileContent={tileContent}
          className="rounded-xl shadow mb-6 border-2 border-blue-100"
        />
        <div className="flex justify-center mt-2 gap-3">
          {moodEmojis.map((emoji, i) => (
            <motion.button
              key={i}
              className={`text-3xl p-3 rounded-full border-2 transition font-bold focus:outline-none ${
                selectedMood === i ? 'bg-blue-200 border-blue-500 scale-110' : 'bg-gray-100 border-transparent'
              }`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.15 }}
              onClick={() => setSelectedMood(i)}
              aria-label={moodLabels[i]}
            >
              {emoji}
            </motion.button>
          ))}
        </div>
        <motion.button
          className="mt-6 w-full py-3 bg-green-400 text-white rounded-xl font-semibold shadow hover:bg-green-500 transition text-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleMoodSubmit}
          disabled={selectedMood === null || saving}
        >
          {saving ? "Saving..." : "Save Mood"}
        </motion.button>
      </motion.div>
    </div>
  );
}
