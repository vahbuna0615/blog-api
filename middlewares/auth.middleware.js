const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const protect = async (req, res, next) => {
  
  let token;

  try {

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      next()

    }

    if (!token) throw new Error("Not authorized, no Bearer token")

  } catch (err) {
    res.status(401)
    next(err)
  }
}

module.exports = { protect }