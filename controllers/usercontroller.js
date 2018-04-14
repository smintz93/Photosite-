const express = require("express");
const router = express.Router();

const User = require("../models/users")



router.get("/", (req, res) => {
	res.send("up and running!")

	console.log("running on nodemon")
})