const express = require('express');
const router = express.Router();
const passport = require('passport');
const {createUser} = require('../services/user-service');

router.post('/login', 
passport.authenticate('local', {failureRedirect: '/login.html'}),
 (req, res) => {
    res.sendStatus(200);
});

router.post('/signup', async (req, res) => {
    try {
        await createUser(req.body);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(400);
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        req.logout();
        res.cookie('connect.sid', req.cookies['connect.sid'], {maxAge: -1});
        res.sendStatus(200);
    });
});

module.exports = router;