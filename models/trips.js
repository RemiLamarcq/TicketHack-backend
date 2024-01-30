const mongoose = require("mongoose")

const tripschema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
    isPaid: Boolean
})


const Trips = mongoose.model("trips", tripschema)

module.exports = Trips