const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const db = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, res) {
    try {
        let database = db.getDb("employees");
        let collection = database.collection("records");
        let cursor = collection.find({});
        let records = await cursor.toArray();
        res.status(200).json(records);
    } catch (err) {
        res.status(400).json("Error finding employee records");
    }
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
    try {
        let database = db.getDb("employees");
        let collection = database.collection("records");
        let filter = { _id: new ObjectId(req.params.id) }

        let result = await collection.findOne(filter);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json("Error finding record");
    }
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async function (req, res) {
    try {
        let database = db.getDb("employees");
        let collection = database.collection("records");
        let newEmployee = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
        let result = await collection.insertOne(newEmployee);
        res.status(200).json(result);
    } catch(err) {
        res.status(400).json("Error creating new employee");
    }
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async function (req, res) {
    try {
        let database = db.getDb("employees");
        let collection = database.collection("records");
        let filter = { _id: new ObjectId(req.params.id) }; // mongodb id is ObjectId BSON type
        let updateValues = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };

        let result = await collection.updateOne(filter, { $set: updateValues });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json("Error updating employee");
    }
});

// This section will help you delete a record
recordRoutes.route("/:id").delete(async (req, res) => {
    try {
        let database = db.getDb("employees");
        let collection = database.collection("records");
        let filter = { _id: new ObjectId(req.params.id) };

        let result = await collection.deleteOne(filter);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json("Error deleting employee");
    }
});

module.exports = recordRoutes;