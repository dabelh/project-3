const FETCH_GAMES ='SELECT * FROM `games`'
const FETCH_CATEGORY ='SELECT * FROM `games` WHERE category = ?'
const ADD_GAME = 'INSERT INTO `comments` (`id`, `comment`) VALUES (?,?)';
const FETCH_GAME = 'SELECT * FROM `games` WHERE id = ?'
const FETCH_COMMENTS = 'SELECT * FROM `comments` WHERE id = ?'


const fetchTasks = () => global.mysqlConnection.execute(FETCH_GAMES, []);

const fetchCategory = (category)=> global.mysqlConnection.execute(FETCH_CATEGORY, [category]);

const addcomment = (id,comment)=>{
    return global.mysqlConnection.execute(ADD_GAME, [id,comment]);
}

const fetchGame =(id)=> global.mysqlConnection.execute(FETCH_GAME, [id]);

const fetchComments =(id)=> global.mysqlConnection.execute(FETCH_COMMENTS, [id]);


module.exports = {fetchTasks,
                  fetchCategory,
                  addcomment,
                 fetchGame,
                 fetchComments};