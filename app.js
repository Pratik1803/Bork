require("dotenv").config();
const path = require("path");
require(path.join(__dirname, "./database/connection"));
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require(path.join(__dirname, "./routers/user"));
const taskRouter = require(path.join(__dirname, "./routers/tasks"));
const habitRouter = require(path.join(__dirname, "./routers/habit"));
const feedbackRouter = require(path.join(__dirname, "./routers/feedback"));

const port = process.env.PORT || 8000;

app.use(
	cors({
		origin: true,
	})
);
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(habitRouter);
app.use(feedbackRouter);

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`Listening to port ${port}...`);
});
