// Import Client from mongodb package
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Create the constant with Mongo Connection String
const MONGO_URI = process.env.MONGO_URI;
// console.log(`MONGO_URI: ${MONGO_URI}`);

// Create the constant of DB
const database = "demoDb";

// Create the client by create a new instance with Conn String
const client = new MongoClient(MONGO_URI);

//Asynchronous function to connect Cluster using the client
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    return client.db(database); // Replace with your database name
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

// Exporting the function to app scope
module.exports = connectDB; //Exporting the function to app scope
