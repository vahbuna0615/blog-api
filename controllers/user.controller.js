const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

/** 
 * @desc Register new user
 * @route POST /api/user/register
 * @access Public
 */

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User with given email id already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    })

  } catch (err) {
    next(err)
  }

}

/** 
 * @desc Authenticate a user
 * @route POST /api/user/login
 * @access Public
 */

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.status(404)
      throw new Error("No user with given email id found")
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
      res.status(401)
      throw new Error("Invalid credentials")
    }

    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    })

  } catch (err) {
    next(err)
  }
}

/** 
 * @desc Get logged in user's data
 * @route GET /api/user
 * @access Private
 */

const getUser = async (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    next(err)
  }
}


module.exports = {
  registerUser,
  loginUser,
  getUser
}