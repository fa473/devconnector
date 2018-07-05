const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

// Load profile and user model
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   GET /api/profile
// @desc    Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar']
      )
      if (!profile)
        return res
          .status(404)
          .json({ noprofile: 'There is no profile for this user' })
      res.json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route   GET /api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    if (!profiles)
      return res.status(404).json({ noprofile: 'There are no user profiles' })
    res.json(profiles)
  } catch (err) {
    res.status(404).json({ noprofile: 'There are no user profiles' })
  }
})

// @route   GET /api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle
    }).populate('user', ['name', 'avatar'])
    if (!profile)
      return res
        .status(404)
        .json({ noprofile: 'There is no profile for this user' })
    res.json(profile)
  } catch (err) {
    res.status(404).json(err)
  }
})

// @route   GET /api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar'])
    if (!profile)
      return res
        .status(404)
        .json({ noprofile: 'There is no profile for this user' })
    res.json(profile)
  } catch (err) {
    res.status(404).json({ noprofile: 'There is no profile for this user' })
  }
})

// @route   POST /api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = validateProfileInput(req.body)
      if (result.error) return res.status(400).json(result.error)

      // Get fields
      const profileFields = {}
      profileFields.user = req.user.id
      // if (req.body.handle) profileFields.handle = req.body.handle
      // if (req.body.company) profileFields.company = req.body.company
      // if (req.body.website) profileFields.website = req.body.website
      // if (req.body.location) profileFields.location = req.body.location
      // if (req.body.bio) profileFields.bio = req.body.bio
      // if (req.body.status) profileFields.status = req.body.status
      // if (req.body.githubusername)
      //   profileFields.githubusername = req.body.githubusername

      if (req.body.handle) profileFields.handle = req.body.handle
      if (req.body.company) profileFields.company = req.body.company
      if (req.body.website) profileFields.website = req.body.website
      if (req.body.location) profileFields.location = req.body.location
      profileFields.bio = req.body.bio
      if (req.body.status) profileFields.status = req.body.status
      if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername

      // Skills split into array
      if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
      }

      // Social fields
      profileFields.social = {}
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
      if (req.body.instagram)
        profileFields.social.instagram = req.body.instagram

      let profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        res.json(profile)
      } else {
        // Create
        // Check if handle exists
        let profile = await Profile.findOne({ handle: profileFields.handle })
        if (profile)
          return res.status(400).json({ handle: 'Handle already exists' })

        // Save profile
        profile = await new Profile(profileFields).save()
        res.json(profile)
      }
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route   POST /api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = validateExperienceInput(req.body)
      if (result.error) return res.status(400).json(result.error)

      const profile = await Profile.findOne({ user: req.user.id })
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add to experience array
      profile.experience.unshift(newExperience)

      await profile.save()
      res.json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route   POST /api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = validateEducationInput(req.body)
      if (result.error) return res.status(400).json(result.error)

      const profile = await Profile.findOne({ user: req.user.id })
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add to experience array
      profile.education.unshift(newEducation)

      await profile.save()
      res.json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route   DELETE /api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.experience.remove(req.params.exp_id)

      await profile.save()
      res.json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route   DELETE /api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      await profile.education.remove(req.params.edu_id)

      await profile.save()
      res.json(profile)
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

// @route   DELETE /api/profile
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      await Profile.findOneAndRemove({ user: req.user.id })
      await User.findOneAndRemove({ _id: req.user.id })

      // res.json(profile)
      res.json('success')
    } catch (err) {
      res.status(404).json(err)
    }
  }
)

module.exports = router
