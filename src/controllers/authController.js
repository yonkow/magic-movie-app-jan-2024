const router = require('express').Router();
const bc = require('bcrypt');
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', async (req, res) => {
    const regData = req.body;

    const hash = await bc.hash(req.body.password, 12);

    regData.password = hash;

    try {
        await authService.register(regData);
        res.redirect('/auth/login');
        
    } catch (error) {
        console.log(error.message);
        res.redirect('/auth/register');
    }

});

module.exports = router;