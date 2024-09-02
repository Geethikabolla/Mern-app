const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;

if (!Db) {
    console.error("MongoDB URI is not defined in the environment variables.");
    process.exit(1);  // Exit the process with an error code
}

console.log("MongoDB URI:", Db);  // Add this line to debug

const client = new MongoClient(Db);

var _db;

module.exports = {
    connectToMongoDB: async function (callback) {
        try {
            await client.connect();
            _db = client.db("employees");
            console.log("Successfully connected to MongoDB.");
            return callback(null);
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            return callback(error);
        }
    },

    getDb: function () {
        return _db;
    },

    closeConnection: async function () {
        try {
            await client.close();
            console.log("MongoDB connection closed.");
        } catch (error) {
            console.error("Error closing MongoDB connection:", error);
        }
    }
};
