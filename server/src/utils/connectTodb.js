const mongoose = require("mongoose");


async function connectToDb() {
  const uri = process.env.URIDB
  try {
      await mongoose.connect(uri)
      console.log("db connected")
    } catch (error) {
        console.log(error);
    }
} 


module.exports = connectToDb;