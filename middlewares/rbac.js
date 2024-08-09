const roles = {
  Admin: 'Admin',
  Manager: 'Manager',
  User: 'User'
};

const authorize = (role) => {
  return (req, res, next) => {
      if (req.user.role !== role) return res.status(403).send('Forbidden.');
      next();
  };
};

export { roles, authorize };
 