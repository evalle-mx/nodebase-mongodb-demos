const express = require("express");
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

const PORT = process.env.NODE_PORT || 3001;
const connectionString = process.env.DOCKER_URI; // ATLAS_URL | DOCKER_URI
// console.log("connectionString: ", connectionString);
const dbName = "star-wars-quotes";
const collName = "quotes";
var db;
var quotesCollection;

const app = express();

//Connecting to DataBase (MongoDB)
MongoClient.connect(connectionString)
  .then((client) => {
    console.log(
      "Connecting to Database" +
        (connectionString.includes("127.0.0") ? " (Local)" : "(Remote)")
    );
    db = client.db(dbName);
    quotesCollection = db.collection(collName);

    console.log(`Open new Browser window at http://localhost:${PORT}/`);
  })
  .catch((error) => {
    console.log(
      "Error connecting to Database, check URL, Username & Password::: "
    );
    console.error(error);
  });

// middleware to handle reading data from the <form> element (body null)
app.use(express.urlencoded({ extended: true }));
// Middleware to use Embedded JavaScript (EJS)[http://www.embeddedjs.com/]
/* >>> Need to run in folder, otherwise: Failed to lookup view "index.ejs" in views directory   */
app.set("view engine", "ejs");
// make 'public' folder (and content) accessible by using built-in middleware
app.use(express.static("public"));

app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  console.log("Entering Root...");
  //res.send("<h1>Welcome to home</h1>");
  /* Reading Documents on load, But HTML has no native method to add dynamic content */
  const cursor = db
    .collection(collName)
    .find()
    .toArray()
    .then((results) => {
      console.log(results);
      res.render("index.ejs", { quotes: results });
    })
    .catch((error) => console.error(error));
  //   res.sendFile(__dirname + "/index.html"); // Note: __dirname is the current directory
});

app.post("/quotes", (req, res) => {
  console.log("Entering quotes Create/post ");
  const { body } = req;
  console.log("body: ", body);

  //Inserting to DB using MongoClient
  quotesCollection
    .insertOne(body)
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.put("/quotes", (req, res) => {
  console.log("body: ", req.body);

  quotesCollection
    .findOneAndUpdate(
      { name: "yoda" }, //searchs for docs where name=='yoda'

      {
        $set: {
          //replaces Fields with incomming values
          name: req.body.name,
          quote: req.body.quote,
        },
      },
      {
        upsert: true, //updates or inserts if does not exists
      }
    )
    .then((result) => {
      console.log(result);
      res.json("Success");
    })
    .catch((error) => console.error(error));
});

app.delete("/quotes", (req, res) => {
  // Handle delete event here
  let qName = req.body.name;
  quotesCollection
    .deleteOne({ name: qName })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.json("No more quote to delete");
      }
      res.json(`Deleted ${qName}'s quote`);
    })
    .catch((error) => console.error(error));
});

app.listen(PORT, () => {
  console.log(`Zellwk App is listening on port ${PORT}`);
});
