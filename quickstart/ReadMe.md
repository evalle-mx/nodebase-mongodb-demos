# quickStart

Standalone script that perform certain basic tasks. These are derived from the Intercom Article [Connect to your data with Node.js / Javascript](https://app.intercom.com/a/apps/qq7v0gqb/knowledge-hub/article/8182071) and [CRUD Operations in Node.js](https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/) tutorial on the MongoDB YouTube channel, created by Lauren Schaefer.

original scripts are located on _mongodb-developer_/[nodejs-quickstart](https://github.com/mongodb-developer/nodejs-quickstart)

### modules (AKA packages/libraries)

This project was uploaded using the following modules and version (you can check via running `npm list`)

- mongodb
- dotenv

Tested on Node v23.1.0

### Steps required to run this Project

- Open a Terminal and init the project via `npm init` (or `npm init -y` with default the values). This will create a new folder called node_modules and two files: package-lock.json and package.json.
- Run `npm i mongodb` to install modules
- create a new file ".env" (dot env) and add the required data. (Check or rename attached _env_ file)
- Run `node <fileName>.js` on terminal

> **⚠️ Important:** Make sure to READ the usage and consequences via the code comments before running the script.

#### Expected File System:

```bash
quickstart
├ .env
├ 1.listDatabases.js
├ 2.create.js
├ 3.read.js
├ 4.update.js
├ 5.delete.js
├ aggregation.js
├ ReadMe.md
├ transactions.js
├ userCollection.js
```
