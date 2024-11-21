const { MongoClient } = require("mongodb");
/* Importing constants as a file */
// const { constants } = require('./data/constants')
// const { username, password, database, cluster, collName} = constants ;
require("dotenv").config();

async function main() {
  const uri = `mongodb+srv://${process.env.username}:${process.env.password}@${process.env.cluster}/${process.env.database}?retryWrites=true&w=majority`;

  //console.log("uri: ", uri);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
