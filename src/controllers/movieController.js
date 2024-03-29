const router = require('express').Router();
const movieService = require('../services/movieService');
const castService = require('../services/castService');

const { isAuth } = require('../middlewares/authMiddleware');
const { errorMessage } = require('../utils/errorUtil');

router.get('/create', isAuth, (req, res) => {
    res.render('movie/create');
});

router.post('/create', isAuth, async (req, res) => {
    const newMovie = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await movieService.create(newMovie);

        res.redirect('/');
    } catch (err) {

        res.render('movie/create', { ...newMovie, error: errorMessage(err)});
    }
});

router.get('/search', async (req, res) => {
    const { title, genre, year } = req.query;

    try {
        const movieResult = await movieService.search(title, genre, year).lean();

        res.render('search', { movies: movieResult, title, genre, year });
    } catch (err) {
        if(err) {
            res.redirect('/404');
        };
    }

});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const currentMovie = await movieService.getOne(movieId).lean();
    const isOwner = currentMovie.owner == req.user?._id;

    if (!currentMovie) {
        return res.redirect('/404');
    }

    // TODO: This is not perfect, use handlebars helpers
    currentMovie.rating = new Array(Number(currentMovie.rating)).fill(true);

    res.render('movie/details', { movie: currentMovie, isOwner });
});

router.get('/movies/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll(movieId).lean();
    // TODO: remove already added cast
    res.render('movie/attach', { ...movie, casts });
});

router.post('/movies/:movieId/attach', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attach(req.params.movieId, castId);

    res.redirect(`/movies/${movieId}/attach`);
});

router.get('/movies/:movieId/edit', isAuth, async (req, res) => {

    if (!req.user) {
        return res.redirect('/auth/login')
    }

    const movie = await movieService.getOne(req.params.movieId).lean();

    res.render('movie/edit', { movie });
});

router.post('/movies/:movieId/edit', isAuth, async (req, res) => {
    const movieDetails = req.body;

    await movieService.edit(req.params.movieId, movieDetails);

    res.redirect(`/movies/${req.params.movieId}`);
});

router.get('/movies/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    await movieService.delete(movieId);

    res.redirect('/');
})

module.exports = router;
