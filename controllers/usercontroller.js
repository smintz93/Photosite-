const express = require("express");
const router = express.Router();

const Users = require("../models/users")

// TEST

// router.get("/", (req, res) => {
// 	res.send("up and running!")

// 	console.log("running on nodemon")
// })

// SEED DATA

	// Users.create({
	// 	username: "Batman",
	// 	photo: "http://alt.sd33.bc.ca/sites/default/files/outdoor.jpg",
	// 	photoinfo: "outdoor picture"
	// })

	// Users.create({
	// 	username: "bob",
	// 	photo: "https://cdn.pixabay.com/photo/2015/12/01/20/28/green-1072828_960_720.jpg",
	// 	photoinfo: "tree picture"
	// })

//

// INDEX

router.get("/", (req, res) => {
	Users.find((err, users) => {
	
		res.render("users/index.ejs",{
			userList: users
		});

	});
});

// DO I NEED THIS?
router.use((req, res, next) => {
	// console.log("I am middleware and will be run for all routes");
	next();
})

// NEW ROUTE 

router.post("/", (req, res) => {
	Users.create(req.body, (err, createdUser) => {
		if(err) console.log(err);
		console.log(createdUser);

		res.redirect("/users")
		
	})
})


router.get("/new", (req, res) => {
	res.render("users/new.ejs")
})





























module.exports = router;