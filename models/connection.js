const mongoose = require("mongoose")
//const connectionString = process.env.DB_CONNECTION_STRING
const connectionString = "mongodb+srv://admin:ksaEUYCbM2rMxMH1@cluster0.mhzuser.mongodb.net/TICKETHACK"
mongoose.set("strictQuery", true)

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Successfully connected to the Database 🥳 !"))
  .catch((errorMessage) => console.error(errorMessage))