const mongoose = require("mongoose");


const Photos = require("./photos.js")

const Schema = mongoose.Schema

const userSchema = new Schema({
	username: String,
	password: String,
	photos: [Photos.schema]

})


module.exports = mongoose.model("User", userSchema)




