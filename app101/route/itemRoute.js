const express = require("express");
const router = express.Router();

const ObjectId = require("mongodb").ObjectId;

// CREATE an item
router.post("/", async (req, res) => {
  //   res.status(201).json({ message: "This is POST method! " });
  try {
    const newItem = req.body;
    console.log("Inserting new Item: ", newItem);
    const result = await req.db.collection("items").insertOne(newItem);

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to Create item" });
  }
});
// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await req.db.collection("items").find().toArray();
    //accessing the db connection, go to collection
    // execute find, transform in array
    res.status(200).send(items);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Failed to fetch items" });
  }
});
// UPDATE item
router.patch("/:id", async (req, res) => {
  //res.status(200).json({ message: "This is PATCH method! " });
  const { id } = req.params;
  let myquery = { _id: new ObjectId(id) };
  try {
    console.log(`Updating document id:${id} with the following: `, req.body);

    const result = await req.db
      .collection("items")
      .updateOne(myquery, { $set: req.body });
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update item" });
  }
});
// DELETE item
router.delete("/:id", async (req, res) => {
  //res.status(200).json({ message: "This is DELETE method! " });
  const { id } = req.params;
  try {
    const result = await req.db
      .collection("items")
      .deleteOne({ _id: new ObjectId(id) });
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// Exporting to app scope
module.exports = router;
