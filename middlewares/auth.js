
import jwt from 'jsonwebtoken';

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      req.user = user;

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    });
  };
};
 
export default auth;
 
