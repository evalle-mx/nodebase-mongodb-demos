const uri =
  "mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>NAME>mongodb.net?retryWrites=true&w=majority";

/* //// Node.js Version 12
const { MongoClient } = require("mongodb");

const client = new MongoClient(uri);

client.connect((err) => {
  console.log("connecting...");

  const collection = client.db("sample_supplies").collection("sales");
  console.log("err");

  collection.findOne({}).then((sale) => {
    console.log("SALE::  ", sale);
  });
  client.close();
});  //  */

/* //// Node.js Version 16
const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(uri, {
   useNewUrlParse: true,
   useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    console.log("connecting...");

    const collection = client.db("sample_supplies").collection("sales");
    const sale = collection.findOne({});
    console.log("SALE::  ", sale);
  } finally {
    await client.close();
  }
}

run().catch(console.dir); // */
