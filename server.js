
const express = require("express"); 
const app = express();




// app.get("/", (req, res) => {
// 	res.send("up and running!")

// 	console.log("running on nodemon")
// })

require("./db/db")






app.listen(3000, () => {
	console.log('Server is listenning on Port 3000');
})