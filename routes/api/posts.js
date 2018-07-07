const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Post model
const Post = require('../../models/Post')

// Load Post validation
const validatePostInput = require('../../validation/post')

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (err) {
    res.status(404).json(err.message)
  }
})

// @route   GET /api/posts/:id
// @desc    Get single post by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.json(post)
  } catch (err) {
    res.status(404).json(err.message)
  }
})

// @route   POST /api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = validatePostInput(req.body)
      if (result.error) return res.status(400).json(result.error)

      const newPost = new Post({
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id
      })

      const post = await newPost.save()
      res.json(post)
    } catch (err) {
      res.status(404).json(err.message)
    }
  }
)

// @route   DELETE /api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (post.user.toString() === req.user.id) {
        await post.remove()
        return res.json('success')
      }
      res.status(401).json({ notauthorized: 'not authorized to delete post' })
    } catch (err) {
      res.status(404).json(err.message)
    }
  }
)

// @route   POST /api/posts/like/:id
// @desc    Like post by id
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ alreadyliked: 'You already liked this post' })
      }
      if (post.user.toString() === req.user.id) {
        return res
          .status(400)
          .json({ alreadylike: 'User cannot like own post' })
      }
      post.likes.push({ user: req.user.id })
      await post.save()
      res.json(post)
    } catch (err) {
      res.status(404).json(err.message)
    }
  }
)

// @route   POST /api/posts/unlike/:id
// @desc    Unlike post by id
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // Find post by id
      const post = await Post.findById(req.params.id)
      // Check if user has liked post
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res
          .status(400)
          .json({ cannotunlike: "You haven't liked this post" })
      }
      // Find like to remove from likes array
      const like = post.likes.find((like) => {
        return like.user.toString() === req.user.id
      })
      post.likes.remove(like)

      await post.save()
      res.json(post)
    } catch (err) {
      res.status(404).json(err.message)
    }
  }
)

// @route   POST /api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // Find post by id
      const post = await Post.findById(req.params.id)
      // Add new comment to post
      post.comments.push({
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id
      })
      await post.save()
      res.json(post)
    } catch (err) {
      res.status(404).json(err.message)
    }
  }
)

// @route   DELETE /api/comment/:id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // Validate input
      const result = validatePostInput(req.body)
      if (result.error) return res.status(400).json(result.error.message)

      // Find post by id
      const post = await Post.findById(req.params.id)

      // Find comment with given id
      const comment = post.comments.find((comment) => {
        return comment.id === req.params.comment_id
      })

      // Check if comment exists
      if (!comment)
        return res.status(404).json({ notfound: 'Comment not found' })

      // Check if comment belongs to user
      if (comment.user.toString() === req.user.id) {
        // Delete comment
        post.comments.remove(comment)
        await post.save()
        return res.json(post)
      }
      // Comment does not belong to current user
      res.json({ unauthorized: 'Cannot delete comment from another user' })
    } catch (err) {
      res.status(404).json(err.message)
    }
  }
)

module.exports = router
