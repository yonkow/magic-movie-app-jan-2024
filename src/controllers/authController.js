const router = require('express').Router();
const authService = require('../services/authService');
const { isLoggedIn } = require('../middlewares/authMiddleware');

router.get('/register', isLoggedIn, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isLoggedIn, async (req, res) => {
    const regData = req.body;

    try {
        await authService.register(regData);
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error.message);
        res.redirect('/auth/register');
    }
});

router.get('/login', isLoggedIn, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isLoggedIn, async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth', token);

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;
