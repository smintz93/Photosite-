const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	// user will have logged in when they see this, so their username will be stored in the session already
	// so we can send it to the template 
	// remember the session object is available **everywhere** in the controllers
	const d = new Date(Date.now())
	
	const message = req.session.message

	req.session.message = null

	// if(req.session.loggedIn) {
			res.render("home.ejs", {
			username: req.session.username,
			loginDate: d.toLocaleTimeString("en-us"),
			message: message
		})
	// } else {
	// 	req.session.message = "You must be logged in to do that"
	// 	res.redirect("/users/login")
	// }



})


module.exports = router; 