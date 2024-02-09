const router = require('express').Router();
const authService = require('../services/authService');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { errorMessage } = require('../utils/errorUtil');

router.get('/register', isLoggedIn, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isLoggedIn, async (req, res) => {
    const regData = req.body;

    try {
        await authService.register(regData);
        res.redirect('/auth/login');
    } catch (err) {

        let message = errorMessage(err)

        res.render('auth/register', { ...regData, error: message });
    }
});

router.get('/login', isLoggedIn, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isLoggedIn, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);

        res.redirect('/');
    } catch (err) {
        const message = errorMessage(err)

        res.render('auth/login', {email, error: message})
    }
    
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;
