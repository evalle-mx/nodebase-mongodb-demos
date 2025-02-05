const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://<username>:<password>@<cluster.dnsname>.mongodb.net?retryWrites=true&w=majority";

const client = new MongoClient(uri);

client.connect((err) => {
  const collection = client.db("sample_supplies").collection("sales");
  console.log("err");

  collection.findOne({}).then((sale) => {
    console.log("SALE::  ", sale);
  });
  client.close();
});
