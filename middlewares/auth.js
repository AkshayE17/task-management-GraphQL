
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/users.js';

dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user; 
    next();
  } catch (error) { 
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
     
export default auth;
