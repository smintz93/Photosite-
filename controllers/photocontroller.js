const express = require("express");
const router = express.Router();

const Photos = require("../models/photos")
const Users = require("../models/users")


// INDEX


router.get("/", (req, res) => {
	Photos.find((err, photos) => {
	
		res.render("photos/index.ejs",{
			photos: photos
		});

	});
});


// NEW

router.get("/new", (req, res) => {

	Users.find({}, (err, allUsers) => {
		
		res.render("photos/new.ejs", {
			users: allUsers

		})
	})
})


// EDIT HAS TO BE BEFORE SHOW

router.get('/:id/edit', (req, res)=>{
    Photos.findById(req.params.id, (err, foundPhoto)=>{

    Users.find({}, (err, allUsers) => {
      // We can do this to find the author of the selected article
      Users.findOne({'photos._id': req.params.id}, (err, foundPhotoUser) => {

        res.render('articles/edit.ejs', {
          photo: foundPhoto,
          users: allUsers,
          photoUser: foundPhotoUser
        });
      });
    });
    });
});




// SHOW 

router.get("/:id", (req, res) => {
	Photos.findById(req.params.id, (err, thisPhoto) => {
		Users.findOne({"photos._id": req.params.id}, (err, foundUser) => {
			console.log(foundUser)
			if(err) console.log(err);
			res.render("photos/show.ejs", {
				photos: thisPhoto,
				user: foundUser
			})
		
		})
	})
})


router.post("/", (req, res) => {
	Users.findById(req.body.userId, (err, foundUser) => {

		Photos.create(req.body, (err, createdPhoto) => {
			if(err) console.log(err);
			// console.log(createPhoto);
			foundUser.photos.push(createdPhoto);
			console.log(createdPhoto);
			foundUser.save((err, data) => {
			if(err) console.log(err);	

			res.redirect("/photos")
			})
		})
	})
})


// DELETE


router.delete("/:id", (req, res) => {
		Photos.findByIdAndRemove(req.params.id, (err, foundPhotos) => {
			// res.send(foundArticle)
			// // delete the article
			// // if(err) console.log(err);
			Users.findOne({'photos._id': req.params.id}, (err, foundUser) => {
				// res.send(foundAuthor)
				foundUser.photos.id(req.params.id).remove()
				foundUser.save((err, data) => {
					res.redirect("/photos")
				})
			})
			
		})	
})





	






module.exports = router;