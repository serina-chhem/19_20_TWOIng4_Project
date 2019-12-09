var express = require('express');
var router = express.Router();
let User = require('../User.model');


router.get("/", function(req, res, next) {
	User.find()
		.then(User => res.json(User))
		.catch(err => res.status(400).json('Error: ' + err));
})




router.get("/:id", function(req, res, next) {
	User.findById(req.params.id)
		.then(User => res.json(User))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.delete("/:id", function(req, res, next) {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('User deleted.'))
		.catch(err => res.status(400).json('Error: ' + err));
});


router.post("/update/:id", function(req, res, next) {
	User.findById(req.params.id)
		.then(User => {
			User.location = req.body.location;
			User.personsInHouse = req.body.personsInHouse;
			User.houseSize = req.body.houseSize;

			User.save()
				.then(() => res.json('User updated!'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;
