const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')
const Movie = require('../models/Movie')

router.get('/login', ensureGuest, (req,res) => {
    res.render('login', {layout: './login.hbs'})
})


router.get('/dashboard', ensureAuth, async (req,res) => {
    try {
        const stories = await Story.find({user : req.user.id }).lean()
        res.render('dashboard', {
            layout: './main.hbs',
            name : req.user.firstName,
            stories
        })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }    
    
})



router.get('/mymovies', ensureAuth, async (req,res) => {
    try {
        const movies = await Movie.find({user : req.user.id }).lean()
        res.render('mymovies', {
            layout: './main.hbs',
            name : req.user.firstName,
            movies
        })
    } catch (err) {
        console.log(err)
        res.render('error/500')
    }    
    
})





module.exports = router