const express = require('express')
const passport = require('passport')
const  {route}  = require('.')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/google', passport.authenticate('google', {scope : ['profile']}))


router.get('/google/callback', passport.authenticate('google', {failureRedirect : '/login'}), (req, res) => {
    res.redirect('/dashboard')
})


router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

module.exports = router