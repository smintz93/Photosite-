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



	// Users.create({
	// 	username: "Bill46",
	// 	photo: "https://pmcvariety.files.wordpress.com/2015/06/nba-finals-game-1.jpg?w=1000&h=563&crop=1",
	// 	photoinfo: "steph curry"
	// })


	// Users.create({
	// 	username: "Sam3212",
	// 	photo: "https://i2-prod.mirror.co.uk/incoming/article8724876.ece/ALTERNATES/s615/Athletic-Bilbao-v-Barcelona.jpg",
	// 	photoinfo: "messi"
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
// router.use((req, res, next) => {
// 	// console.log("I am middleware and will be run for all routes");
// 	next();
// })

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


// EDIT ROUTE


router.get("/:index/edit", (req, res) => {
	
	Users.findById(req.params.index, (err, user) => {
		if(err) console.log(err);
		res.render("users/edit.ejs", {
			user: user,
			index: user.id
		})
	})
})




// SHOW ROUTE 

router.get("/:id", (req, res) => {

	Users.findById(req.params.id, (err, thisUser) => {
		if(err) console.log(err)
		console.log("edit is being hit")
		res.render("users/show.ejs", {
			user: thisUser,
		})
	})
})



// DELETE

router.delete("/:id", (req, res) => {
	Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
			if(err) console.log(err);
			res.redirect('/users')

	})
})


router.put("/:id", (req, res) => {

	const theUser = {};
	theUser.username = req.body.username;
	theUser.photo = req.body.photo;

	Users.findByIdAndUpdate(req.params.id, theUser, (err, user) => {

		console.log("edit is being hit and it is getting updated")

		console.log(user)
		
		user = theUser

		res.redirect("/users")

		console.log(user)
	})
	
})






module.exports = router;