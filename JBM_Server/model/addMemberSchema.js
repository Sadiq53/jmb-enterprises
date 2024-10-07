require('../config/dataBase');

let mongoose = require("mongoose")

const addMember = mongoose.Schema({
    member_name : String,
    member_phone : Number,
    member_email : String,
    address : String,
    formatdate : {type : String, default : ""},
    createdat : {type : Date, default : ''},
    password : { type : String, default : "" }
}, { collection : "add_member" });

module.exports = mongoose.model("add_member", addMember);