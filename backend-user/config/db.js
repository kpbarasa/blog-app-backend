const mongoose = require('mongoose');


const connectDB = async () => {
    try {
      const PORT = process.env.ENV_PORT
      const atlasURI = process.env.MONGO_URI
  
      // Mongo db connection string  starts here
      mongoose.connect(atlasURI, {
        useNewUrlParser: true, useUnifiedTopology: true
      }, err => {
        if (err) {
  
          console.log('Error un able Connected to MongoDB !!!')
  
        }
        else {
  
          console.log('Connected to MongoDB !!!')
  
        }
      })
  
      const connection = mongoose.connection;
  
      connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
      })
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }

  module.exports = connectDB;