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
    	if(err) console.log(err);
    	Users.find({}, (err, allUsers) => {
    		if(err) console.log(err);
      // We can do this to find the author of the selected article
      		Users.findOne({'photos._id': req.params.id}, (err, foundPhotoUser) => {
      			if(err) console.log(err);

        		res.render('photos/edit.ejs', {
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
			// console.log(foundUser)
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

// PUT ROUTE

router.put('/:id', (req, res)=>{
    // find this article in articles collection
    Photos.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPhoto)=>{
        // find the author with an article in their array that matches
        Users.findOne({ 'photos._id': req.params.id }, (err2, foundUser) => {
            // update article:
      if(foundUser_id != req.body.UserId){
      // if the foundAuthor does not equal the req.body author
        foundUser.photos.id(req.params.id).remove();
        foundUser.save((err, savedFoundUser) => {
          Users.findById(req.body.userId, (err, newUser) => {
            newUser.photos.push(updatedPhotop);
            newUser.save((err, savedNewUser) => {
              res.redirect('/photos/' + req.params.id)
            })
        })
      })
      } else {
          foundUser.photos.id(req.params.id).remove();
          // push new one
          foundUser.photos.push(updatedPhoto)
          // save the updated author to database
          foundUser.save((err, data) => {
            // let's go back to that article's show page
            res.redirect('/photos/' + req.params.id)
          })
      }
        });
    });
});



	




module.exports = router;