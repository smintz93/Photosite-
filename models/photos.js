const mongoose = require("mongoose");

const Schema = mongoose.Schema

const photoSchema = new Schema({
	link: {
		type: String, 
	},
	body: {
		type: String
	}

})

module.exports = mongoose.model("Photo", photoSchema)



