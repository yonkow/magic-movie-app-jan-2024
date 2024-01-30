const router = require('express').Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie);

        res.redirect('/');
    } catch (err) {
        console.error(err.message);

        res.redirect('/create');
    }
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const currentMovie = await movieService.getOne(movieId).lean();

    // TODO: This is not perfect, use handlebars helpers
    currentMovie.rating = new Array(Number(currentMovie.rating)).fill(true);

    res.render('details', { movie: currentMovie });
});

router.get('/search', async (req, res) => {
    const { title, genre, year } = req.query;
    const movieResult = await movieService.search(title, genre, year).lean();

    res.render('search', { movies: movieResult, title, genre, year });
});

router.get('/movies/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll().lean();
    // TODO: remove already added cast
    res.render('movie/attach', { ...movie, casts });
});

router.post('/movies/:movieId/attach', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId
    
    await movieService.attach(req.params.movieId, castId);

    res.redirect(`/movies/${movieId}/attach`);
});

module.exports = router;
