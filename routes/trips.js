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


router.put('/bookedByID', function(req,res){
    Trips.findById(req.body.id).then(data => {
        Trips.updateOne({_id : req.body.id},{isBooked : true}).then((data) => {
            res.json({result : true, data})
            console.log(data)
        })
    })
})

router.get('/booked', function (req,res){
    Trips.find({isBooked : true}).then(data => {
        res.json({result : true, trips :data})
    })
})

router.put('/notBooked', function(req,res){
    Trips.findById(req.body.id).then(data => {
    Trips.updateOne({_id : req.body.id},{isBooked : false}).then((data) => {
        res.json({result : true, data})
        console.log(data)
    })
})})

router.put('/paidById', function(req,res){
    Trips.findById(req.body.id).then(data => {
        Trips.updateOne({_id : req.body.id},{isPaid : true}).then((data) => {
            res.json({result : true, data})
            console.log(data)
        })
    })})

router.get('/Paid', function(req,res){
    Trips.find({isPaid : true}).then(data => {
        res.json({result : true, trips :data})
    })})


/* INIT isBooked -> false*/

    router.put('/isBookedTrue', function (req, res){
    Trips.find().then(data => {
        Trips.updateMany({},{isBooked : false}).then((data) => {
            res.json({result : true, data})
        })
    })
})

/* INIT isPaid -> false*/
router.put('/isPaidFalse', function (req, res){
    Trips.find().then(data => {
        Trips.updateMany({},{isPaid : false}).then((data) => {
            res.json({result : true, data})
        })
    })
})






module.exports = router;
