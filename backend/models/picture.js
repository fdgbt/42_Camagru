const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;
const addToLogs = require('../utils/logs');

class Picture {
    constructor(title, description, date, imgUrl, likes, comments, visible, userId, id) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.imgUrl = imgUrl;
        this.likes = likes;
        this.comments = comments;
        this.visible = visible;
        this.userId = userId;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        let dbOperation;
        if (this._id) {
            dbOperation = db.collection('pictures')
                .updateOne({ _id: this._id }, { $set: this });
        }
        else {
            dbOperation = db.collection('pictures')
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

    static fetchAll() {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        return db
            .collection('pictures')
            .find()
            .toArray()
            .then(pictures => {
                return pictures;
            })
            .catch(err => {
                const error = new Error("DB Error:", err);

                error.httpStatusCode = 500;
                throw (error);
            });
    }

    static fetchVisible() {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        return db
            .collection('pictures')
            .find({ visible: 'public' })
            .toArray()
            .then(pictures => {
                return pictures;
            })
            .catch(err => {
                const error = new Error("DB Error:", err);

                error.httpStatusCode = 500;
                throw (error);
            });
    }

    static fetchNVisible(limit, total, page, lastpage) {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        if (!limit)
            limit = 1;

        if (page > lastpage)
            page = lastpage;

        let skip = total - page * limit;

        if (skip < 0) {
            skip = 0;
            limit = total % limit;
        }

        return db
            .collection('pictures')
            .find({ visible: 'public' })
            .skip(skip)
            .limit(limit)
            .toArray()
            .then(pictures => {
                return pictures;
            })
            .catch(err => {
                const error = new Error("DB Error:", err);

                error.httpStatusCode = 500;
                throw (error);
            });
    }

    static fetchOwned(ownerId) {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        return db
            .collection('pictures')
            .find({ userId: mongodb.ObjectId(ownerId) })
            .sort({ date: -1 })
            .toArray()
            .then(pictures => {
                return pictures;
            })
            .catch(err => {
                const error = new Error("DB Error:", err);

                error.httpStatusCode = 500;
                throw (error);
            });
    }

    static fetchOwnedN(ownerId, limit) {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        if (!limit)
            limit = 1;

        return db
            .collection('pictures')
            .find({ userId: mongodb.ObjectId(ownerId) })
            .limit(limit)
            .sort({ date: -1 })
            .toArray()
            .then(pictures => {
                return pictures;
            })
            .catch(err => {
                const error = new Error("DB Error:", err);

                error.httpStatusCode = 500;
                throw (error);
            });
    }

    static fetchUsername(ownerId) {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        return db
            .collection('pictures')
            .find({ userId: ownerId })
            .toArray()
            .then(pictures => {
                return pictures;
            })
            .catch(err => {
                const error = new Error("DB Error:", err);

                error.httpStatusCode = 500;
                throw (error);
            });
    }

    static fetchVisibleUsername(ownerId) {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        return db
            .collection('pictures')
            .find({ userId: ownerId, visible: 'public' })
            .sort({ date: -1 })
            .toArray()
            .then(pictures => {
                return pictures;
            })
            .catch(err => {
                const error = new Error("DB Error:", err);

                error.httpStatusCode = 500;
                throw (error);
            });
    }

    static findById(picId) {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        return db
            .collection('pictures')
            .find({ _id: mongodb.ObjectId(picId) })
            .next()
            .then(picture => {
                return (picture);
            })
            .catch(err => {
                addToLogs("DB ERROR", err);
            });
    }

    static deleteById(picId) {
        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        return db
            .collection('pictures')
            .deleteOne({ _id: mongodb.ObjectId(picId) })
            .catch(err => {
                addToLogs("DB ERROR", err);
            });
    }

    static async populateComsById(picId) {

        const db = getDb();
        if (!db) {
            const error = new Error("DB not found.");

            error.httpStatusCode = 500;
            throw (error);
        }

        try {
            const result = await db
                .collection('pictures')
                .aggregate([
                    {
                        "$match": {
                            "_id": mongodb.ObjectId(picId)
                        }
                    },
                    {
                        $lookup:
                        {
                            from: "users",
                            localField: "comments.userId",
                            foreignField: "_id",
                            as: "usersDoc"
                        }
                    },
                    {
                        $addFields: {
                            "comments": {
                                $map: {
                                    input: "$comments",
                                    as: "input",
                                    in: {
                                        $mergeObjects: [
                                            "$$input",
                                            {
                                                $first: {
                                                    $filter: {
                                                        input: "$usersDoc",
                                                        cond: {
                                                            $eq: [
                                                                "$$this._id",
                                                                "$$input.userId"
                                                            ]
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            },
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            description: 1,
                            date: 1,
                            imgUrl: 1,
                            likes: 1,
                            comments: {
                                text: 1,
                                date: 1,
                                userId: 1,
                                _id: 1,
                                username: 1,
                            },
                            visible: 1,
                            userId: 1
                        }
                    }
                ])
                .next();

            return result;

        } catch (err) {
            if (!err.httpStatusCode)
                err.httpStatusCode = 500;
            throw (err);
        }
    }
}

module.exports = Picture;