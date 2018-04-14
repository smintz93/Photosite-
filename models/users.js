const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema({
	username: {
		type: String, 
		required: true,
	},
	photo: {
		type: String, 

	},
	photoinfo: {
		type: String
	}
})



module.exports = mongoose.model("User", userSchema)