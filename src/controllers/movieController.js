const router = require('express').Router();
const movieService = require('../services/movieService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie);

        res.redirect('/');
    } catch(err) {
        console.error(err.message);

        res.redirect('/create');
    };
    
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const currentMovie = await movieService.getOne(movieId).lean();

    // TODO: This is not perfect, use handlebars helpers
    currentMovie.rating = new Array(Number(currentMovie.rating)).fill(true);

    res.render('details', { movie: currentMovie });
});

router.get('/search', (req, res) => {
    const {title, genre, year} = req.query;
    const movieResult = movieService.search(title, genre, year);

    res.render('search', {movies: movieResult, title, genre, year});
});

module.exports = router;
