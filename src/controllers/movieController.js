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
    const {title, genre, year} = req.query;
    const movieResult = movieService.search(title, genre, year);

    res.render('search', {movies: movieResult, title, genre, year});
});

module.exports = router;
