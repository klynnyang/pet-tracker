const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');

router.get('/search', postsCtrl.searchPost);
router.use(require('../../config/auth'));
router.post('/data', postsCtrl.createPost);
router.post('/image', postsCtrl.createImage);
router.get('/all', postsCtrl.allPosts);
router.get('/latest', postsCtrl.postLatest);
router.get('/', postsCtrl.postsIndex);
router.delete('/:userid/:postid', postsCtrl.deletePost)
router.get('/:id', postsCtrl.postShow);

module.exports = router;