const express = require('express')
const app = express()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('./Config/db');

const port = 

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Check if user exists in the database
  const user = await db.query('SELECT * FROM person WHERE email = ?', [email]);
  if (!user || !user.length) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare password with hashed password in the database
  const match = await bcrypt.compare(password, user[0].password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign({ userId: user[0].id }, 'mysecret', { expiresIn: '1h' });
  res.json({ token });
});

app.get('/profile', authenticate, async(req, res) => {
    const { userId } = req;
    
    // Get user profile data from the database
    const user = await db.query('SELECT * FROM person WHERE id = ?', [userId]);
    if (!user || !user.length) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.json(user[0]);
  });
  
  function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decodedToken = jwt.verify(token, 'mysecret');
      req.userId = decodedToken.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
}


app.listen(port, () => `koneksi port ${port}`);  