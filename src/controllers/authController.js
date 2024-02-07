const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const regData = req.body;

    try {
        await authService.register(regData);
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error.message);
        res.redirect('/auth/register');
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth', token);

    res.redirect('/');
});

module.exports = router;
