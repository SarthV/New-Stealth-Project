const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Movie = require('../models/Movie')

router.get('/all', ensureAuth, async (req,res) => {
    try {
        const movies = await Movie.find({status : 'public'})
        .populate('user')
        .lean();

        res.render('movies/index', {
            movies
        })
    } catch (error) {
        console.log(error);
        res.render('error/500')
    }
})
router.get('/add', ensureAuth, (req,res) => {
    res.render('movies/add')
})

router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Movie.create(req.body);
        res.redirect('/mymovies')
    } catch (error) {
        console.log(error);
        res.render('error/500')
    }
})

module.exports = router