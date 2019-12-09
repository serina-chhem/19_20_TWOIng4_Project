var express = require("express");
var router = express.Router();
const mongoose = require('mongoose');
let User = require('../User.model');
let Measure = require('../measure.model');
let Sensor = require('../sensor.model');


router.get("/", function(req, res, next) {
	User.find()
		.then(User => res.json(User))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.get("/nbDocs", function(req, res, next) {

	User.count({}, (err, nbDocs) => {
		res.json(nbDocs);
	});

})

router.get("/nbSensors", function(req, res, next) {

	Sensor.count({}, (err, nbDocs) => {
		res.json(nbDocs);
		console.log(err);
	});

})

router.get("/getAvg", function(req,res,next){
	Measure.aggregate([

	{
		$group:
		{
			_id:'$type',
			avgTemperature: { $avg : '$value' } 
		}
	}

	]).
	then(function(result) {
		res.json(result)
	});
})

router.get("/latestRec", function(req, res, next){

	User.aggregate([
	{
		$sortByCount: "$location"
	},
		{ $limit: 1 }

	]).
		then(function(result) {
			res.json(result)
		});

})

router.get("/getLoc", function(req, res, next) {

	User.aggregate([
		{
			$sortByCount: "$location"
		},
		

	]).
		then(function(result) {
			res.json(result)
		});

})
router.get("/measureData", function(req, res, next) {

	Measure.find()
		.then(meas => res.json(meas))
		.catch(err => res.status(400).json('Error: ' + err));


})

router.post("/", function(req, res, next) {

	const location = req.body.location;
	const personsInHouse = req.body.personsInHouse;
	const houseSize = req.body.houseSize;

	const newUser = new User({ location, personsInHouse, houseSize });

	newUser.save()
		.then(() => res.json('User added'))
		.catch (err => res.status(400).json('Error: ' + err));

});







module.exports = router;
