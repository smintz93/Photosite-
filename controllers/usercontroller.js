const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Users = require("../models/users")
const Photos = require("../models/photos")

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






// Register 

router.get("/register", (req, res) => {
	console.log(req.session, "Hey this was logged from within user register")
	res.render("home/register.ejs");
})




// Login

router.get("/login", (req, res) => {

	const message = req.session.message
	req.session.message = null;

	res.render("home/login.ejs", {
		message: message
	})
})



// POST Login


router.post("/login", (req, res) => {

	// 1. find the user 
	Users.findOne({ username: req.body.username}, (err, userFound) => {
		// 2 if there is a user with that username
		if(userFound) {

			// 3. compare passwords
			if(bcrypt.compareSync(req.body.password, userFound.password)) {
			// 4. set up session
			req.session.username = req.body.username;
			req.session.loggedIn = true;
			req.session.message = "Hope you're having a nice day"

			//5. send them along
			res.redirect("/home")

			} 
			// passwords dont match
			else {
			// don't say if it was username or password that was no good. 
			req.session.message = "Incorrect username or password."
			res.redirect("/users/login")

			}


		} 
		// 2. user was not found
		else {
			req.session.message = "Incorrect username or password."
			res.redirect("/users/login")
		}
	})
})




// POST Register 


router.post("/register", (req, res) => {
	
	// capture password
	const password = req.body.password;

	// 1st param is password you are encrypting
	// 2nd param is the algorithm we encrypt with and the salt

	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

	// this is the obj we will store in db
	const userDbEntry = {
		username: req.body.username,
		password: passwordHash
	}

	Users.create(userDbEntry, (err, createdUser) => {
		console.log(createdUser, "^^ this is the user that got created ---------");
		// You can add whatever data you want
		req.session.username = createdUser.username
		req.session.loggedIn = true;
		req.session.message = "Thanks for signing up, " + req.body.username;


		res.redirect("/home")


	})

})


// NEW ROUTE 


// router.post("/", (req, res) => {
// 	Users.create(req.body, (err, createdUser) => {
// 		if(err) console.log(err);
// 		console.log(createdUser);

// 		res.redirect("/users")
		
// 	})
// })


// router.get("/new", (req, res) => {
// 	res.render("users/new.ejs")
// })


// EDIT ROUTE

router.get("/:id/edit", (req, res) => {
	
	Users.findById(req.params.id, (err, user) => {
		if(err) console.log(err);
		res.render("users/edit.ejs", {
			user: user,
			id: user.id
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
		photos.findByIdAndRemove(req.params.id, (err, foundPhoto) => {
			// res.send(foundPhoto)
			// // delete the article
			// // if(err) console.log(err);
			Users.findOne({'photos._id': req.params.id}, (err, foundUser) => {
				// res.send(foundUser)
				found.photo.id(req.params.id).remove()
				foundUser.save((err, data) => {
					res.redirect("/photos")
				})
			})
			
		})	
})


router.put("/:id", (req, res) => {

	const theUser = {};
	theUser.username = req.body.username;

	Users.findByIdAndUpdate(req.params.id, theUser, (err, user) => {

		console.log("edit is being hit and it is getting updated")

		console.log(user)
		
		user = theUser

		res.redirect("/users")

		console.log(user)
	})
	
})




module.exports = router;