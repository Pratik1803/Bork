const express = require("express");
const router = new express.Router();
const path = require("path");
const FeedBack = require(path.join(__dirname, "../models/Feedback"));

//for posting a feedback

router.post("/feedback", async (req,res)=>{
    try {
        const result = await FeedBack(req.body).save();
        res.status(200).json("Submitted!");
    } catch (error) {
        console.log(error);
        res.status(400).json("Submitted!");
    }
});


module.exports = router;