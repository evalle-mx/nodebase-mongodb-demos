/* This script display environment values if dotenv is successfully installed: 
$ node testEnv.js   */
require("dotenv").config();
console.log("<Testing environment values...>");

const ENVIRONMENT = process.env.ENVIRONMENT;
const port_node = process.env.NODE_PORT;
const VSC_PORT = process.env.VSC_PORT;

console.log(`Environment: ${ENVIRONMENT}`);
console.log(`Node's Port: ${port_node}`);
console.log(`Vsc's Port: ${VSC_PORT}`);
