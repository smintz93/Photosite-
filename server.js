
const express = require("express"); 
const app = express();
const bodyParser = require("body-parser")
const session = require("express-session");
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')



// app.get("/", (req, res) => {
// 	res.send("up and running!")

// 	console.log("running on nodemon")
// })

require("./db/db")

// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
	secret: "help the weather is bad", // used to excrpt
	resave: false, // do not update unless the session object is changed
	saveUninitialized: false //it is illegal to store cookies in a user browser until they log in
}));
	

app.set('view engine', 'ejs');
app.use(expressLayouts);


// CONTROLLERS 
const userControllers = require("./controllers/usercontroller")
app.use("/users", userControllers)
const photoControllers = require("./controllers/photocontroller")
app.use("/photos", photoControllers)
const homeControllers = require("./controllers/homecontroller")
app.use("/home", homeControllers)

app.get("/", (req, res) => {
	res.render("home/links.ejs")
})

app.get("*", (req, res) => {
	res.status(404).send("That aint a page")
})




app.listen(3000, () => {
	console.log('Server is listenning on Port 3000');
})