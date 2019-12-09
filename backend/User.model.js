const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let User = new Schema(
    
    {
    userID: {
        type: Object
    },
    location: {
        type: String
    },
    personsInHouse: {
        type: Number
    },
    houseSize: {
        type: String 
    }
   
    }, 

    { collection: 'User' }

    );
 

module.exports = mongoose.model('User', User);