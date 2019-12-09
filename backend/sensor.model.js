const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Sensor = new Schema(
    
    {
    SensorId: {
        type: Object
    },
    creationDate: {
        type: Date
    },
    location: {
        type: String
    },
    
    userId: {
        type: Object 
    }
   
    }, 

    { collection: 'Sensor' }

    );
 

module.exports = mongoose.model('Sensor', Sensor);