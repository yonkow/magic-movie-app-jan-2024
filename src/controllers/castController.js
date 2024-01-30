const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', (req, res) => {
    const data = req.body;

    console.log(data);

    res.redirect('/');

});

module.exports = router;