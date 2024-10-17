const express = require('express');
const { createComic, updateComic, deleteComic, getComic, getComics } = require('../controllers/comicController');
const router = express.Router();

router.post('/', createComic);
router.put('/:id', updateComic);
router.delete('/:id', deleteComic);
router.get('/:id', getComic);
router.get('/', getComics);

module.exports = router;
