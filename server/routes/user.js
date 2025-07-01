const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/mood', async (req, res) => {
  const { token, date, mood, thought } = req.body;
  try {
    const decoded = jwt.verify(token, 'SECRET');
    const user = await User.findById(decoded.id);
    
    user.moods = user.moods.filter(m => m.date !== date);
    user.moods.push({ date, mood, thought });
    await user.save(); 
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Invalid token or server error' });
  }
});


router.get('/moods', async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, 'SECRET');
    const user = await User.findById(decoded.id);
    res.json({ moods: user.moods });
  } catch (err) {
    res.status(400).json({ error: 'Invalid token or server error' });
  }
});

router.post('/game', async (req, res) => {
  const { token, date } = req.body;
  try {
    const decoded = jwt.verify(token, 'SECRET');
    const user = await User.findById(decoded.id);
    let gameDay = user.games.find(g => g.date === date);
    if (gameDay) gameDay.count += 1;
    else user.games.push({ date, count: 1 });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Invalid token or server error' });
  }
});

router.get('/games', async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, 'SECRET');
    const user = await User.findById(decoded.id);
    res.json({ games: user.games });
  } catch (err) {
    res.status(400).json({ error: 'Invalid token or server error' });
  }
});

module.exports = router;
