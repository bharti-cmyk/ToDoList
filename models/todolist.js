const mongoose = require('mongoose');

const todolistSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    duedate:{
        type: Date,
        required:true
    },

})


const Todolist = mongoose.model('Todolist', todolistSchema);

module.exports = Todolist;