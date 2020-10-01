const express = require('express');
const router = express.Router();
const {addTaskValidation} = require('../validations/task-validation');
const {fetchTasks,fetchCategory,addcomment,fetchGame,fetchComments} = require('../services/tasks-service');
const {badRequestHandler} = require('../utils');


router.get('/game/:id', async (req, res) => {
    try {
        const {id}= req.params
        const [rows] = await fetchGame(id);
        return res.json(rows);
    } catch(err) {
        console.log(err)
        return badRequestHandler();
    }
});

router.get('/comments/:id', async (req, res) => {
    try {
        const {id}= req.params
        const [rows] = await fetchComments(id);
        return res.json(rows);
    } catch(err) {
        console.log(err)
        return badRequestHandler();
    }
});
router.get('/:category', async (req, res) => {
    try {
        const {category} = req.params
        const [rows] = await fetchCategory(category);
        return res.json(rows);
    } catch(err) {
        console.log(err)
        return badRequestHandler(res);
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await fetchTasks();
        return res.json(rows);
    } catch(err) {
        return badRequestHandler();
    }
});


router.post('/', async (req, res) => {
    try {
        const {id,comment} = req.body
        await addcomment(id,comment);
        return res.sendStatus(200);
    } catch(err) {
        console.log(err)
        return badRequestHandler();
    }
});


module.exports = router;
// enter task under your session name and show only your task