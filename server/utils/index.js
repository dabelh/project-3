const TASK_VALUES = ['todo', 'due_to'];
const badRequestHandler = (res) =>{res.sendStatus(400)};

module.exports = {TASK_VALUES, badRequestHandler};