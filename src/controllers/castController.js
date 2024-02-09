const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const castService = require('../services/castService')
const { errorMessage } = require('../utils/errorUtil')

router.get('/create', isAuth, (req, res) => {
    res.render('cast/create');
});

router.post('/create', isAuth, async (req, res) => {
    const castData = req.body;

    try {
        await castService.create(castData);

        res.redirect('/');
    } catch (err) {
        
        res.render('cast/create', { ...castData, error: errorMessage(err) });
    }

});

module.exports = router;