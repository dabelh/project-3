const express = require('express');
const router = express.Router();
const {badRequestHandler} = require('../utils');
const FETCH_USER_VACATIONS = 'SELECT * FROM users_vacations where user_id = ?'
const fetchIds = (x) => global.mysqlConnection.execute(FETCH_USER_VACATIONS, [x]);

router.get('/user', async (req, res) => {
    try {
        const userData = req.user;
        return res.json(userData);
    } catch(err) {
        return badRequestHandler(res);
    }
});



router.get('/', async (req, res) => {
    try {
        const {id} = req.user;
        const [followed] = await fetchIds(id);
        const update = followed.map(x=>x.vacation_id)
        const [usersVacations] = await global.mysqlConnection.execute(`SELECT * FROM vacations WHERE id IN (${update.toString()});`, []);
        const [restVacations] = await global.mysqlConnection.execute(`SELECT * FROM vacations WHERE NOT id IN (${update.toString()})`, []);
        return res.json(usersVacations.concat(restVacations));
    } catch(err) {
        return badRequestHandler(res);
    }
});

//router.get('/', async (req, res) => {
//    try {
//        const {username} = req.user;
//        const [rows] = await fetchCations();
//        return res.json(rows);
//    } catch(err) {
//        return badRequestHandler();
//    }
//});


module.exports = router;