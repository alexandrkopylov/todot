/**
 * Created by a.kopylov on 21.12.2015.
 */
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo', {
    text: String
});

module.exports = Todo;