var express = require('express');
var router = express.Router();
var moment = require('moment'); // require


const Trips = require('../models/trips');

/* GET trips listing. */
router.get('/', function(req, res, next) {
    Trips.find().then(data => {
       res.json({result : true, trips : data}); 
    })
    
});

/* POST trips by departure & arrival & date*/

router.post('/selectedTrips', function(req, res) {
    let departure = req.body.departure;
    let arrival = req.body.arrival; 
    let date = new Date(req.body.date)
    let startDate = moment(date).startOf("day")
    let endDate = moment(date).endOf("day")
    
    tripData = {
        departure,
        arrival,
        date: {$gte : startDate, $lte : endDate} ,
    }

    Trips.find( tripData ).then(data => {
        const tripsFound = {
            departure : data[0].departure,
            arrival : data[0].arrival, 
            price: data[0].price,
            date: date.getHours()
        }
        console.log(tripsFound)
        res.json({result : true, trips : data}) 
    })
    })






module.exports = router;
