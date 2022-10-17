const dotenv = require('dotenv')
const path = require("path");
const connectDB = require('./config/db')
require("dotenv").config();

// Load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = require('./app')


const PORT = process.env.ENV_PORT || 5000

const server = app.listen(PORT, () => {
  console.log("server running in " + process.env.NODE_ENV + " mode, listening on port " + PORT);
})

