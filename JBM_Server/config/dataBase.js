let mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Sadiq53:ZX7t5iTyKPCNcMOE@cluster0.cunxumm.mongodb.net/JBM");
// mongoose.connect("mongodb://0.0.0.0:27017/assignment");

mongoose.connection.on("connected", ()=>{
    console.log("connected")
})
mongoose.connection.on("error", (err)=>{
    console.log(err)
})

module.exports = mongoose;