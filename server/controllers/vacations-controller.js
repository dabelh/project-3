const express = require('express');
const router = express.Router();
const {badRequestHandler} = require('../utils');
const FETCH_VACATIONS = 'SELECT * FROM `vacations`'
const FETCH_USER_VACATIONS = 'SELECT FROM vacations RIGHT JOIN users_vacations ON vacations.id = users_vacations.vacation_id where users_vacations.user_id=?'
const FETCH_REST_VACATIONS = 'SELECT vacations FROM vacations RIGHT JOIN users_vacations ON vacations.id = users_vacations.vacation_id where users_vacations.user_id=?'

const fetchCations = (x) => global.mysqlConnection.execute(FETCH_VACATIONS, [x]);

router.get('/', async (req, res) => {
    try {
        const {id} = req.user;
        const [rows] = await fetchCations(id);
        return res.json(rows);
    } catch(err) {
        return badRequestHandler();
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