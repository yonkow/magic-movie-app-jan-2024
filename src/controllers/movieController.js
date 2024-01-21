const router = require('express').Router();
const movieService = require('../services/movieService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const newMovie = req.body;
    movieService.create(newMovie);
    res.redirect('/');
});

router.get('/movies/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const currentMovie = movieService.getOne(movieId);
    currentMovie.rating = new Array(Number(currentMovie.rating)).fill(true);

    res.render('details', { movie: currentMovie });
});

router.get('/search', (req, res) => {
    const movies = movieService.getAll();

    res.render('search', {movies});
});

module.exports = router;
