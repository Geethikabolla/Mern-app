const express = require("express");
const { body, validationResult } = require("express-validator");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Middleware for centralized error handling
const handleErrors = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

recordRoutes.route("/record").get(handleErrors(async (req, res) => {
    const db_connect = dbo.getDb();
    const result = await db_connect.collection("records").find({}).toArray();
    res.status(200).json(result);
}));

recordRoutes.route("/record/:id").get(handleErrors(async (req, res) => {
    const db_connect = dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("records").findOne(myquery);
    if (!result) {
        return res.status(404).json({ message: "Record not found." });
    }
    res.status(200).json(result);
}));

recordRoutes.route("/record/add").post([
    body('name').notEmpty().withMessage('Name is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('level').notEmpty().withMessage('Level is required')
], handleErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const db_connect = dbo.getDb();
    const { name, position, level } = req.body;
    const newRecord = { name, position, level };
    const result = await db_connect.collection("records").insertOne(newRecord);
    console.log("1 document created");
    res.status(201).json(result);
}));

recordRoutes.route("/record/update/:id").put([
    body('name').notEmpty().withMessage('Name is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('level').notEmpty().withMessage('Level is required')
], handleErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const db_connect = dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const { name, position, level } = req.body;
    const updatedValues = {
        $set: { name, position, level }
    };
    const result = await db_connect.collection("records").updateOne(myquery, updatedValues);
    if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Record not found or no changes made." });
    }
    console.log("1 document updated");
    res.status(200).json(result);
}));

recordRoutes.route("/record/:id").delete(handleErrors(async (req, res) => {
    const db_connect = dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("records").deleteOne(myquery);
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Record not found." });
    }
    console.log("1 document deleted");
    res.status(200).json(result);
}));

// Global error handling middleware
recordRoutes.use((err, req, res, next) => {
    console.error("An error occurred:", err.message);
    res.status(500).json({ message: "An internal server error occurred." });
});

module.exports = recordRoutes;
