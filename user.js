const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    userType: String,
});

//converting to a model
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;