// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./schema.js'); 

dotenv.config();

const app = express();
app.use(express.json()); 


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('monogodb Connected to database'))
  .catch((err) => console.error('Error connecting to database:', err));


app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;

  
    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res
        .status(400)
        .json({ message: 'Validation error', details: error.message });
    } else {
      res.status(500).json({ message: 'Server error', details: error.message });
    }
  }
});

const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});