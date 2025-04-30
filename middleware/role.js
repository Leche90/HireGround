// middleware/role.js

const allowRoles = (...roles) => {
    return (req, res, next) => {
      const userRole = req.user?.role;
  
      if (!userRole) {
        return res.status(403).json({ error: 'Role not found in token' });
      }
  
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: 'Access denied: insufficient role' });
      }
  
      next();
    };
  };
  
  module.exports = allowRoles;
  