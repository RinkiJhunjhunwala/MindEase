const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const userRoutes = require('./routes/user');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
app.listen(5000, () => console.log('Server running on 5000'));
