const mongoose = require("mongoose")

const tripschema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
    isBooked: Boolean,
    isPaid: Boolean
})


const Trips = mongoose.model("trips", tripschema)

module.exports = Trips