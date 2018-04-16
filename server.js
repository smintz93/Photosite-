
const express = require("express"); 
const app = express();
const bodyParser = require("body-parser")
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
	

app.set('view engine', 'ejs');
app.use(expressLayouts);


// CONTROLLERS 
const userControllers = require("./controllers/usercontroller")
app.use("/users", userControllers)
const photoControllers = require("./controllers/photocontroller")
app.use("/photos", photoControllers)



app.listen(3000, () => {
	console.log('Server is listenning on Port 3000');
})