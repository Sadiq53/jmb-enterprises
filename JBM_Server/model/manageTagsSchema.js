require('../config/dataBase');

let mongoose = require("mongoose")

const manageTags = mongoose.Schema({
    pending_records : { type : Number, default : 0 },
    in_yard_records : { type : Number, default : 0 },
    release_records : { type : Number, default : 0 },
    hold_records : { type : Number, default : 0 }
}, { collection : "manage_tags" });

module.exports = mongoose.model("manage_tags", manageTags);