const express = require("express");
const connectDB = require("./conn/db");
const itemsRoute = require("./route/itemRoute");

require("dotenv").config();

const app = express();

var message = process.env.MESSAGE;

const port = process.env.PORT || 3001;

app.use(express.json());

connectDB().then(
  //if creation is successful, then execute the following
  (db) => {
    // arrow function receiving db instance as param
    app.use((req, res, next) => {
      // app will call this function before function received called next
      req.db = db; // add the db client to request body
      next(); // will execute the function received
    });

    app.use("/api/items", itemsRoute);

    app.use("/", (req, res) => {
      res.send(message);
    });
    app.listen(port, () => {
      console.log(`Server Listening on port: ${port}`);
    });
  }
);
