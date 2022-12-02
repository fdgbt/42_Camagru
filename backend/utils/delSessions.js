const mongodb = require('mongodb');
const getDb = require('./database').getDb;

const deleteSessionsById = (userId) => {

    const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            return next(error);
        }

        return db
            .collection('sessions')
            .deleteMany({'session.user._id': mongodb.ObjectId(userId)})
            .catch(err => {
                const error = new Error("DB Error:", err);

                error.httpStatusCode = 500;
                return next(error);
            });
}

module.exports = deleteSessionsById;