/* This Connection Program uses NodeJS-MongoDB [mongodb@4.5.0, dotenv@16.0.0 ] */
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
/* get Variables from env */
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const cluster = process.env.CLUSTER_NAME;

/*  TESTING DATA */
let dbName = "sample_mflix";
let colName = "movies";
let dTitle = "The Great Train Robbery";

// console.log(`Client username: ${username}, pwd ${password} `); //only initial testing
/* Set URI constant */
const URI = `mongodb+srv://${username}:${password}@${cluster}?retryWrites=true&w=majority`;
//`mongodb+srv://azrael-interactive:${password}@api-v3-alpha-testing.0x6m4.mongodb.net/api-v5-alpha-testing?retryWrites=true&w=majority&maxPoolSize=250`;

//console.log('Uri: ', URI);

/* Instantiated client */
const client = new MongoClient(URI);

/* Just Open & Close connection */
const attemptToConnect = () => {
  client
    .connect()
    .then((cli) => {
      // console.log(cli, 'Connected');
      console.log("Connected: ", cli);
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

/* 2. Open Connection, Read a document and close connection */
const findOneDocument = (dbName, collName, docTitle) => {
  console.log(
    `<findOneDoc> searching \'${docTitle}\' in ${dbName}.${collName}`
  );

  client
    .connect()
    .then((cli) => {
      //get Database
      const database = cli.db(dbName);
      //get collection
      const collection = database.collection(collName);

      //Query predicate (search where title is..)
      const query = { title: docTitle };

      return collection.findOne(query);
    })
    .then((document) => {
      if (document) {
        console.log(document);
      } else {
        console.log(`${docTitle} was Not found in the collection ${collName} `);
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

//attemptToConnect();
findOneDocument(dbName, colName, dTitle);
