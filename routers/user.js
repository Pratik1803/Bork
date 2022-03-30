const express = require("express");
const path = require("path");
const User = require(path.join(__dirname, "../models/User"));
const bcrypt = require("bcryptjs");
const router = new express.Router;


// to create a new User
router.post("/userSignUp", async(req,res)=>{
    try {
        const result = await User(req.body).save();
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send("Email or Username already Taken!");
    }
});

// to login the user
router.post("/userSignIn", async(req,res)=>{
    try {
        const result = await User.findOne({username:req.body.username});
        const bcryptedPassword = await bcrypt.compare(req.body.password, result.password);
        if(bcryptedPassword){
            res.status(200).send({state:true,result});
        }else{
            res.status(200).send({state:false,result});
        }
        res.send();
    } catch (error) {
        res.status(400).send();
    }
});

// to get username of the user
router.post("/username", async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.body.user_id});
        res.status(200).send(user.username);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;