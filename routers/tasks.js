const express = require("express");
const router = new express.Router();
const path = require("path");
const Task = require(path.join(__dirname, "../models/Task"));

// To add a Task
router.post("/tasks", async (req, res) => {
	try {
		const result = await Task(req.body).save();
		res.status(201).send(result);
	} catch (error) {
		console.error(error);
		res.status(400).send();
	}
});

// To get all tasks of user by userID
router.post("/userTasks", async (req, res) => {
	try {
		const result = await Task.find({ user_id: req.body.user_id });
		res.status(200).send(result);
	} catch (error) {
		console.error(error);
		res.status(400).send();
	}
});

// Update the task by ID
router.patch("/tasks", async (req, res) => {
	try {
		const result = await Task.findOneAndUpdate(
			{ _id: req.body._id },
			{ task: req.body.updatedTask },
			{ new: true }
		);
		res.status(200).send(result);
	} catch (error) {
		console.error(error);
		res.status(400).send();
	}
});

// Mark a task as complete or in-progress by ID
router.put("/tasks", async (req, res) => {
	try {
		const result = await Task.findOneAndUpdate(
			{ _id: req.body.completedTask._id },
			{ task: req.body.completedTask.task },
			{ new: true }
		);
        res.status(200).send(result);
	} catch (error) {
		console.log(error);
		res.status(400).send();
	}
});

// Delete a task by its ID
router.delete("/tasks", async (req, res) => {
	try {
		const result = await Task.findByIdAndDelete(
			{ _id: req.body._id },
			{ new: true }
		);
		res.status(200).send(result);
	} catch (error) {
		console.error(error);
		res.status(400).send();
	}
});

//to delete all completed tasks
router.delete("/completedTasks", async (req,res)=>{
	try {
		const result = await Task.deleteMany({user_id:req.body.user_id, _id:{$in:req.body.tasksToBeDeleted}});
		res.status(200).send();
	} catch (error) {
		console.error(error);
		res.status(400).send();
	}
})

module.exports = router;
