const router = require('express').Router();
const moviesService = require('../services/movieService');

router.get('/', async (req, res) => {
    const movies = await moviesService.getAll().lean();

    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/404', (req, res) => {
    res.render('404');
});
module.exports = router;
