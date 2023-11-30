const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

var _db;

module.exports = {
	connectToServer: async function (callback) {
		try {
			await client.connect();
			console.log("Successfully connected to MongoDB");
		} catch (err) {
			console.log(err.stack);
		} finally {
			await client.close();
		}
	},

	getDb: function (dbName) {
		_db = client.db(dbName);
		return _db;
	},
};