const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const addToLogs = require('../utils/logs');

class User {
    constructor(email, username, password, prefs, admin, id) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.prefs = prefs;
        this.admin = admin;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {

        const db = getDb();
        if(!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);      
        }
        
        let dbOperation;
        if (this._id) {
            dbOperation = db.collection('users')
                .updateOne({ _id: this._id }, { $set: this });
        }
        else {
            dbOperation = db.collection('users')
                .insertOne(this);
        }

        return dbOperation
            .then(result => {
                return (true);
            })
            .catch(err => {
                addToLogs("DB ERROR", err);

                const error = new Error(err);

                error.httpStatusCode = 500;
                throw (error);
            });
    }

    static find(obj){
        
        const db = getDb();
        if(!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);      
        }

        return db
            .collection('users')
            .find(obj)
            .next()
            .then(user => {
                return (user);
            })
            .catch(err => {
                addToLogs("DB ERROR", err);
            });
    }

    static findAll(obj){
        
        const db = getDb();
        if(!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);      
        }

        return db
            .collection('users')
            .find(obj)
            .toArray()
            .then(user => {
                return (user);
            })
            .catch(err => {
                addToLogs("DB ERROR", err);
            });
    }

    static findById(userId) {

        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        return db
            .collection('users')
            .find({ _id: mongodb.ObjectId(userId) })
            .next()
            .then(user => {
                return (user);
            })
            .catch(err => {
                addToLogs("DB ERROR", err);
            });
    }

    static deleteById(userId) {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        return db
            .collection('users')
            .deleteOne({ _id: mongodb.ObjectId(userId) })
            .catch(err => {
                addToLogs("DB ERROR", err);
            });
    }

    static fetchAll(){
        
        const db = getDb();
        if(!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);      
        }

        return db
            .collection('users')
            .find()
            .toArray()
            .then(users => {
                return (users);
            })
            .catch(err => {
                addToLogs("DB ERROR", err);
            });
    }
}

module.exports = User;