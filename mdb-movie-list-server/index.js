const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());

const uri = process.env.MONGO_URI; // Set this in a .env file
const client = new MongoClient(uri);

app.get("/api/movies", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    await client.connect();
    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    const movies = await collection
      .find(
        { type: "movie" },
        {
          projection: {
            title: 1,
            poster: 1,
            year: 1,
            genres: 1,
            directors: 1,
            imdb: 1,
          },
        }
      )
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
