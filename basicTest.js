const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.icm9w.mongodb.net?retryWrites=true&w=majority";

const client = new MongoClient(uri);

client.connect((err) => {
  const collection = client.db("sample_supplies").collection("sales");
  console.log("err");

  collection.findOne({}).then((sale) => {
    console.log("SALE::  ", sale);
  });
  client.close();
});
