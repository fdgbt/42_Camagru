const { MongoClient } = require('mongodb');
const mongoDB = require('../utils/database').MONGODB_URI;

const mongoConnect = require('../utils/database').mongoConnect;
const mongoClose = require('../utils/database').mongoClose;
const getDb = require('../utils/database').getDb;

const addToLogs = require('../utils/logs');

const cleanDatabase = () => {

  mongoConnect((err) => {
    if (err) {
      const error = new Error("DB Error: Failed to connect to mongoDB Atlas.", err);

      error.httpStatusCode = 500;
      throw (error);

    }

    const db = getDb();

    if (!db) {
      const error = new Error("DB not found.");

      error.httpStatusCode = 500;
      throw (error);
    }

    db.listCollections({}, { nameOnly: true })
      .toArray()
      .then((cols) => {
        for (let i in cols) {
          db.collection(cols[i].name).drop()
            .then(() => {
              if (i == cols.length - 1) {
                addToLogs("SCRIPT", "Database wiped successfully");
                console.log("Database wiped successfully.");
                process.exit(0);
              }
            });
        }
      })
  });
};

module.exports = cleanDatabase();