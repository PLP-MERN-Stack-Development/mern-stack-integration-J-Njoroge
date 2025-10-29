// routes/comments.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const router = express.Router();

// GET comments for a post (from separate collection)
router.get('/:postId', async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (e) {
    next(e);
  }
});

// POST new comment (separate collection)
router.post(
  '/',
  auth,
  [
    body('post').notEmpty().withMessage('Post ID is required'),
    body('content').notEmpty().withMessage('Comment content is required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const comment = new Comment({
        post: req.body.post,
        author: req.user.id,
        content: req.body.content,
      });
      await comment.save();

      const populated = await comment.populate('author', 'username');
      res.status(201).json(populated);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;