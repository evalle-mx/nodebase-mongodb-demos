# app101

Two Standalone scripts for connectivity testing:

sampleConn

- Test connectivity using Environment Variables

Index.js that has two methods:

- Test connectivity by Open and Close a connection
- Method that creates a connection, reads a document in a collection and closing the connection

### modules (AKA packages/libraries)

This project was uploaded using the following modules and version (you can check via running `npm list`)

- dotenv
- mongodb

Tested on Node v23.1.0

### Steps required to run this Project

- Open a Terminal and init the project via `npm init` (or `npm init -y` with default the values). This will create a new folder called node_modules and two files: package-lock.json and package.json.
- Run `npm i express dotenv nodemon mongodb` to install modules
- create a new file ".env" (dot env) and add the Connection String for your Instance. (Check or rename attached env_template)
- Run `node index.js` or `nodemon index.js` on terminal

#### Expected File System:

```bash
app101
├── .env
├── index.js
├── sampleConn.js
├── package-lock.json
├── package.json
├── ReadMe.md
```
