const _ = require('lodash');
const {TASK_VALUES} = require('../utils');

const addTaskValidation = (req, res, next) => {
    const fields = Object.keys(req.body);
    const fieldExists = _.size(_.difference(TASK_VALUES, fields)) === 0;
    const isValidFieldsValues = Object.values(req.body).every(x => !!x);
    if (fieldExists && isValidFieldsValues) {
        return next();
    }
    return res.sendStatus(400);
    console.log(fieldExists,isValidFieldsValues)
}

module.exports = {addTaskValidation}