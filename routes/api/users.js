const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../../config/keys').secretOrKey

// Load user model
const User = require('../../models/User')

// @route   GET /api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
  res.json({msg: 'Users works'})
})

// @route   GET /api/users/register
// @desc    Register users route
// @access  Public
router.post('/register', async (req, res) => {
  try {
    // Check if email already registered
    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).json({email: 'email already registered'})

    // Else create new user and store in db
    const avatar = gravatar.url(req.body.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    })

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      avatar: avatar
    })

    await user.save()
    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

// @route   GET /api/users/login
// @desc    Login user: return jwt token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    // Find user by email
    const user = await User.findOne({email: email})
    if (!user) return res.status(404).json({email: 'User not found'})

    // Check password
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({password: 'Invalid email or password'})

    // User matched
    const payload = {id: user.id, name: user.name, avatar: user.avatar} // Create jwt payload

    // Sign token
    const token = jwt.sign(payload, key, {expiresIn: 3600})
    res.json({
      success: true,
      token: `Bearer ${token}`
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
