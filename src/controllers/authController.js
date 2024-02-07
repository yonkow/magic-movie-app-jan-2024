const router = require('express').Router();
const bc = require('bcrypt');
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
})


module.exports = router;