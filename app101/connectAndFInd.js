/* This Connection Program uses NodeJS-MongoDB [mongodb@4.5.0, dotenv@16.0.0 ] */
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
/* get Variables from env */
const username = process.env.DB_USERNAME;
const password = process.env.DB_PWD;
const cluster = process.env.MONGO_DB_URI;

/*  TESTING DATA */
let dbName = "sample_mflix";
let colName = "movies";
let docTitle = "The Great Train Robbery";

// console.log(`Client username: ${username}, pwd ${password} `); //only initial testing
/* Set URI constant */
const MONGO_URI = `mongodb+srv://${username}:${password}@${cluster}?retryWrites=true&w=majority`;
//`mongodb+srv://<USERNAME>:<PASSWORD>@testing.abcde.mongodb.net/testing?retryWrites=true&w=majority&maxPoolSize=250`;

//console.log('Uri: ', MONGO_URI);

/* Instantiated client */
const client = new MongoClient(MONGO_URI);

/* a)  Open & Close connection */
const attemptToConnect = () => {
  client
    .connect()
    .then((cli) => {
      console.log("\n ############   Connected  ########## \n");
      // console.log('cli: ', cli);
    })
    .then((_) => {
      client.close().then((_) => {
        console.log("Closed Database connection");
      });
    })
    .catch((err) => {
      console.log(`\n ############  NOT Connected [${err.code}] ########## \n`);
      console.error(err.message);
      // console.error(err);
    });
};

/* b) Read a document */
const findOne = (databaseName, collectionName, query) => {
  client
    .connect()
    .then((cli) => {
      console.log(
        "\n Connected to DB, performing namespace access, and find Operation \n "
      );
      //get Database
      const database = cli.db(databaseName);
      //get collection
      const collection = database.collection(collectionName);
      //Return the first document
      return collection.findOne(query);
    })
    .then((document) => {
      if (document) {
        console.log(document);
      } else {
        console.log(
          `${docTitle} was Not found in the collection ${collectionName} `
        );
      }
    })
    .then((_) => {
      client.close().then((_) => {
        console.log("Closed Database connection");
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

/*  >>>>>>  EXECUTION   <<<<<<<<<<<<<  */

// attemptToConnect();
//Query predicate (search where title is..)
// const query = { title: docTitle };
findOne(dbName, colName, { title: docTitle });
