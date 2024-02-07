const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
})

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

module.exports = router;