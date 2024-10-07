require('../config/dataBase');

let mongoose = require("mongoose")

const addBank = mongoose.Schema({
    bank : String,
}, { collection : "bank" });

module.exports = mongoose.model("bank", addBank);