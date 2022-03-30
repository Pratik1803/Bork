const mongoose = require("mongoose");
const DB = "mongodb+srv://prtk:Domin%40r400@cluster0.cs1qh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(DB).then(()=>{
    console.log("Connection Successful!");
}).catch((err)=>{
    console.log(err);
});