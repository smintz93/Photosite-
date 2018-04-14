const mongoose  = require("mongoose");

const connectionString = "mongodb://localhost/photosite";


mongoose.connect(connectionString);

mongoose.connection.on("connected", () => {
	console.log("moongoose connnected to db")
});

mongoose.connection.on("err", (err) => {
	console.log("mongoose error: ", err)
});


mongoose.connection.on("disconnected", () => {
	console.log("moongoose disconnected")
});