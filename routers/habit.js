const express = require("express");
const router = new express.Router();
const path = require("path");
const Habit = require(path.join(__dirname, "../models/Habit"));

// for getting all the habits of user by user_id
router.post("/gethabits", async(req,res)=>{
    try {
        const result = await Habit.find({user_id:req.body.user_id});
        res.status(200).send(result)
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
});

// for adding the Habit
router.post("/habit", async(req,res)=>{
    try {
        const result = await Habit(req.body).save();
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
});

// for deleting a habit by _id
router.delete("/habit", async(req,res)=>{
    try {
        const result = await Habit.findByIdAndDelete(req.body.habit_id);
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
        console.error(error);
    }
});

// For marking a habit done/missed by its id
router.patch("/habit", async (req,res)=>{
    try {
        const result = await Habit.findOneAndUpdate({_id:req.body._id},{doneDates: req.body.doneDates});
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
});

//For updating a habit by its _id
router.put("/habit", async(req,res)=>{
    try {
        const result = await Habit.findOneAndReplace({_id:req.body._id}, req.body);
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(400).send();
    }
})

module.exports = router;
