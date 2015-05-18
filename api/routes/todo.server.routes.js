'use strict';

module.exports = function (app) {
    // Todo routing
    var todo = require('../controllers/todo');

    app.get('/todo', todo.get);

    // create todo and send back all todos after creation
    app.post('/todo', todo.post);

    // delete a todo
    app.delete('/todo/:todo_id', todo.delete);

};