const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: String,
    hex: String
});

module.exports = mongoose.model('poland', postSchema);