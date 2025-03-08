const mongoose = require('mongoose')
require('dotenv').config()

var ATLAS_URI = process.env.ATLAS_URL;
console.log(`ATLAS_URI: ${ATLAS_URI}`);

mongoose.connect(ATLAS_URI)
console.log(`state: ${mongoose.connection.readyState} `);
const db = mongoose.connection;
db.once('open', () => {  
    console.log('Successfully connected to Mongo');
    console.log(`state: ${mongoose.connection.readyState} `);
})
db.on('error', (e) => {  
    console.error('Error connecting/processing ');
    console.log(`state: ${mongoose.connection.readyState} `);
    console.log( e );
})


/* 
Read More on: 
https://masteringjs.io/tutorials/mongoose/connection-status
mongoose.connection.readyState
0: disconnected
1: connected
2: connecting
3: disconnecting
*/ 


// ## FINDALL (Test using Model [Schema])
// findAll();


// async function findAll(){
//     const users = await User.find();
//     console.log(users);
//     console.log(`  >>  ${users.length} users on collection: user << `);
// }
