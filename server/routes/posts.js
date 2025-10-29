const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', category } = req.query;
    const query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (category) query.category = category;

    const posts = await Post.find(query)
      .populate('author', 'username')
      .populate('category', 'name')
      .limit(+limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments(query);
    res.json({ posts, totalPages: Math.ceil(total / limit) });
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('category', 'name');
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (e) { next(e); }
});

router.post(
  '/',
  auth,
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title required'),
    body('content').notEmpty().withMessage('Content required'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id,
        category: req.body.category || null,
        image: req.file ? `/uploads/${req.file.filename}` : null,
        featuredImage: req.file ? `/uploads/${req.file.filename}` : 'default-post.jpg',
        slug: '',
        isPublished: true,
      });
      await post.save();
      const populated = await Post.findById(post._id)
        .populate('author', 'username')
        .populate('category', 'name');
      res.status(201).json(populated);
    } catch (e) { next(e); }
  }
);

router.put(
  '/:id',
  auth,
  upload.single('image'),
  [
    body('title').notEmpty(),
    body('content').notEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Not found' });
      if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

      post.title = req.body.title;
      post.content = req.body.content;
      post.category = req.body.category || null;
      if (req.file) {
        post.image = `/uploads/${req.file.filename}`;
        post.featuredImage = `/uploads/${req.file.filename}`;
      }
      await post.save();
      const populated = await Post.findById(post._id)
        .populate('author', 'username')
        .populate('category', 'name');
      res.json(populated);
    } catch (e) { next(e); }
  }
);

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await post.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (e) { next(e); }
});

module.exports = router;





// Only the POST and PUT routes need small changes

// Inside POST route (after validation)
//const post = new Post({
  //title: req.body.title,
  //content: req.body.content,
  //author: req.user.id,
  //category: req.body.category || null, // optional
  //image: req.file ? `/uploads/${req.file.filename}` : null,
  //featuredImage: req.file ? `/uploads/${req.file.filename}` : 'default-post.jpg',
  //slug: '', // will be generated in pre-save
  //isPublished: true, // or false, as needed
//});

// Inside PUT route
//post.category = req.body.category || null;
//if (req.file) {
  //post.image = `/uploads/${req.file.filename}`;
  //post.featuredImage = `/uploads/${req.file.filename}`;
//}
