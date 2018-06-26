const express = require('express')
const passport = require('passport')
const router = express.Router()

// Load profile model
const Profile = require('../../models/Profile')

// Load user model
const User = require('../../models/User')

// @route   GET /api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id})
    if (!profile) return res.status(404).json({noprofile: 'There is no profile for this user'})
    res.json(profile)
  } catch (err) {
    res.status(404).json(err)
  }
})

// @route   POST /api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    // Get fields
    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.status) profileFields.status = req.body.status
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername
    if (req.body.handle) profileFields.handle = req.body.handle

    // Skills split into array
    if (typeof req.body.skills !== 'undefined') profileFields.skills = req.body.skills.split(',')

    // Social fields
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram

    const profile = await Profile.findOne({user: req.user.id})
    if (profile) {
      // Update
      Profile.findOneAndUpdate({user: req.body.user}, {$set: profileFields}, {new: true})
      res.json(profile)
    } else {
      // Create

      // Check if handle exists
      let profile = Profile.findOne({handle: profileFields.handle})
      if (profile) return res.status(400).json({handle: 'Handle already exists'})

      // Save profile
      profile = await new Profile(profileFields).save()
      res.json(profile)
    }
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router
