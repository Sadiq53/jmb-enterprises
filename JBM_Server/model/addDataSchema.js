require('../config/dataBase');

let mongoose = require("mongoose")

const addData = mongoose.Schema({
    bank : String,
    uploaddate : Date,
    formatdate : String,
    file : {type : { name : String, filekey : String, path : String }, default : {name : '', filekey : '', path : '' }}
}, { collection : "add_data" });

module.exports = mongoose.model("add_data", addData);