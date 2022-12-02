const { MongoClient } = require('mongodb');

const addToLogs = require('./logs');

let _db;

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_CLUSTER}.xvyeg.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;

const mongoConnect = (callback) => {

    MongoClient.connect(MONGODB_URI)
        .then(client => {
            addToLogs("DB INFO", "Connected successfully to mongoDB");
            _db = client.db();
            callback();
        })
        .catch(err => {
            const error = new Error(err);

            error.httpStatusCode = 500;
            throw error;
        });

};

const getDb = () => {
    if (_db) {
        return (_db)
    }
    const error = new Error('Not connected to database.');

    error.httpStatusCode = 500;
    throw error;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.MONGODB_URI = MONGODB_URI;