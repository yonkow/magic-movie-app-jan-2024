const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { layouts: false } );
});

module.exports = router;