const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Measure = new Schema(
{

    measureID: {
        type: Object
    },
    type: {
        type: String
    },
    creationDate: {
        type: Date
    },
    value: {
        type: Object
    },
    sensorID: {
        type: Number
    }
},
  
    { collection: 'Measure' }
 
 
);



module.exports = mongoose.model('Measure', Measure);