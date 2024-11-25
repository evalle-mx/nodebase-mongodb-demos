/* This code follows the steps mentioned in Atlas Connection Example
https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/ 
Uses only MongoDriver (module mongodb)
$ npm i mongodb
*/
require("dotenv").config();

const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const cluster = process.env.CLUSTER_NAME;
const database = "sample_training";
// const shardedClusters =
//   "sandbox-shard-00-00.icm9w.mongodb.net:27017,sandbox-shard-00-01.icm9w.mongodb.net:27017,sandbox-shard-00-02.icm9w.mongodb.net:27017";

const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;
// `mongodb://${username}:${password}@sandbox-shard-00-00.icm9w.mongodb.net:27017,sandbox-shard-00-01.icm9w.mongodb.net:27017,sandbox-shard-00-02.icm9w.mongodb.net:27017/?authSource=admin&replicaSet=Cluster0`;

const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log(`Connected correctly to server ${cluster}`);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
