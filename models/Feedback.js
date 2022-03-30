const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        minlength:2
    }
});

const FeedBack = new mongoose.model("feedback", feedBackSchema);

module.exports = FeedBack;