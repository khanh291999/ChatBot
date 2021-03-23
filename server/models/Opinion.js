const mongoose = require('mongoose');

const opinionSchema =  mongoose.Schema({
    name: String,
    opinion: String,
    email: String,
    registerDate: Date
});

const Opinion = mongoose.model('opinion', opinionSchema);

module.exports = { Opinion }
