# app101

Application using the basic modular paradigm for Data interaction (CRUD) between node application with a MongoDB instance using the Native MongoDB Driver

### modules (AKA packages/libraries)

(by running `npm list`)
- dotenv@16.4.5
- express@4.21.1
- mongodb@6.10.0
- nodemon@3.1.7

### Steps required to run this Project

- Open a Terminal and init the project via `npm init` (or `npm init -y` with default the values). This will create a new folder called node_modules.
- Run `npm i express dotenv nodemon mongodb` to install modules
- create a new file ".env" (dot env) and add the Connection String for your Instance. (Check or rename attached env_template)
- Run `node main.js` or `nodemon main.js` on terminal

#### Expected File System:

```bash
app101
├── conn
|    ├── db.js
├── node_modules
|    ├── ..... (Multiple folders, NOT MODIFY)
├── route
|    ├── itemRoute.js
├── .env
├── main.js
├── ReadMe.md
```
