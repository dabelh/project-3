const express = require('express');
const router = express.Router();
const {badRequestHandler} = require('../utils');
const GET_ALL_VACATIONS = 'SELECT * FROM `vacations`'
const FETCH_USER_VACATIONS = 'SELECT * FROM users_vacations where user_id = ?';
const REMOVE_VACATION = 'DELETE FROM `users_vacations` WHERE `users_vacations`.`user_id` = ? AND `users_vacations`.`vacation_id` = ?';
const ADD_VACATION ='INSERT INTO `users_vacations`(`user_id`, `vacation_id`) VALUES (?,?)';
const DELETE_VACATION='DELETE FROM `vacations` WHERE id = ?'
const GET_VACATIONS ='SELECT vacation_id, COUNT(*) as followers FROM users_vacations GROUP BY vacation_id'
const all =() => global.mysqlConnection.execute(GET_ALL_VACATIONS, []);
const fetchIds = (x) => global.mysqlConnection.execute(FETCH_USER_VACATIONS, [x]);
const getStats = () => global.mysqlConnection.execute(GET_VACATIONS, []);
const deleteVac = (x) => global.mysqlConnection.execute(DELETE_VACATION, [x]);
const unfollow = (a,b) => global.mysqlConnection.execute(REMOVE_VACATION, [a,b]);
const follow = (a,b) => global.mysqlConnection.execute(ADD_VACATION, [a,b]);

router.get('/user', async (req, res) => {
    try {
        const userData = req.user;
        return res.json(userData);
    } catch(err) {
        return badRequestHandler(res);
    }
});
router.get('/stats', async (req, res) => {
    try {
        const [v] = await getStats()
        return res.json(v);
    } catch(err) {
        return badRequestHandler(res);
    }
});
router.get('/delete/:id', async (req, res) => {
    try {
        const {id}= req.params;
        await deleteVac(Number(id));
        res.sendStatus(200);
    } catch (err) {
        return badRequestHandler(res);
    }
});

router.get('/follow/:userID/:id', async (req, res) => {
    try {
        const {id,userID}= req.params;
        await follow(Number(userID),Number(id))
        res.sendStatus(200);
    } catch (err) {
        return badRequestHandler(res);
    }
});
router.get('/unfollow/:userID/:id', async (req, res) => {
    try {
        const {id,userID}= req.params;
        const [ok] = await unfollow(Number(userID),Number(id))
        res.sendStatus(200);
    } catch (err) {
        return badRequestHandler(res);
    }
});


router.get('/', async (req, res) => {
    try {
        const {id} = req.user;
        const [followed] = await fetchIds(id);
        if(followed.length>1){
        const update = followed.map(x=>x.vacation_id)
        const [usersVacations] = await global.mysqlConnection.execute(`SELECT * FROM vacations WHERE id IN (${update.toString()});`, []);
        const [restVacations] = await global.mysqlConnection.execute(`SELECT * FROM vacations WHERE NOT id IN (${update.toString()})`, []);
        const followedVacations = usersVacations.map(vacation=>{
            return{...vacation,followed:true}
        })
        const UnfollowedVacations = restVacations.map(vacation=>{
            return{...vacation,followed:false}
        })
        return res.json(followedVacations.concat(UnfollowedVacations));
        }
        else{
            const [a] =await all()
            const b = a.map(vacation=>{
            return{...vacation,followed:false}
        })
            return res.json(b)
        }
    } catch(err) {
        console.log(err)
        return badRequestHandler(res);
    }
});



module.exports = router;