/*
creating our DB schema
only mongoose make this possible
*/
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
});

const Userdb = mongoose.model('userdb', userSchema);

//exporting or db schema to be manipulated in our controller
 module.exports = Userdb;