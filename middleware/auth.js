const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Ensure decoded payload has the expected structure
    if (!decoded.id) {
      return res.status(401).json({ 
        error: 'Malformed token',
        details: 'Token must contain user ID' 
      });
    }
    
    req.user = { id: decoded.id ,
    email: decoded.email};

    next();
  } catch (error) {
    res.status(401).json({ 
      error: 'Invalid token',
      details: error.message
    });
  }
};

module.exports = authenticate;