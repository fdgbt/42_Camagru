const mongodb = require('mongodb');

const mongoConnect = require('../utils/database').mongoConnect;
const getDb = require('../utils/database').getDb;
const addToLogs = require('../utils/logs');

const checkEmpty = (db, forceClean, cb) => {

  if (forceClean === true) {
    db.listCollections({}, { nameOnly: true })
      .toArray()
      .then((cols) => {
        for (let i in cols) {
          db.collection(cols[i].name).drop();
        }
        console.log("Database wiped successfully.");
        addToLogs("SCRIPT", "Database wiped successfully");
        cb();
      })
  }
  else {
    db.collection('users')
      .find()
      .toArray()
      .then(users => {
        if (users.length > 0) {
          const error = new Error("Users not clean.");

          error.httpStatusCode = 409;
          throw (error);
        }

        db.collection('pictures')
          .find()
          .toArray()
          .then(pictures => {

            if (pictures.length > 0) {
              const error = new Error("Pictures not clean.");

              error.httpStatusCode = 409;
              throw (error);
            }

            cb();
          });
      });
  }
};

const seedDatabase = (forceClean) => {

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

    checkEmpty(db, forceClean, () => {

      db.collection('users')
        .insertMany(userSeed)
        .then(() => {
          db.collection('pictures')
            .insertMany(pictureSeed)
            .then(() => {
              console.log("Database seeded successfully.");
              addToLogs("SCRIPT", "Database seeded successfully");
              process.exit(0);
            })
            .catch(err => {
              const error = new Error(err);

              error.httpStatusCode = 500;
              throw (error);
            });


        })
        .catch(err => {
          throw (err);
        });
    });
  });
};

module.exports = seedDatabase;

const rootId = new mongodb.ObjectId();
const date = new Date();

const userSeed = [
  {
    email: process.env.SEED_ADMIN_MAIL,
    username: "Admin",
    password: process.env.SEED_ADMIN_PWD,
    prefs: {
      comsMail: false,
      likesMail: false,
      levelsMail: false,
      visibility: "private"
    },
    admin: {
      date: date,
      role: "Administrator",
      level: "Gold",
      enabled: true
    },
    _id: null
  },
  {
    email: process.env.SEED_MODO_MAIL,
    username: "Modo",
    password: process.env.SEED_MODO_PWD,
    prefs: {
      comsMail: false,
      likesMail: false,
      levelsMail: false,
      visibility: "private"
    },
    admin: {
      date: date,
      role: "Moderator",
      level: "Silver",
      enabled: true
    },
    _id: null
  },
  {
    email: process.env.SEED_ROOT_MAIL,
    username: "Root",
    password: process.env.SEED_ROOT_PWD,
    prefs: {
      comsMail: true,
      likesMail: true,
      levelsMail: true,
      visibility: "public"
    },
    admin: {
      date: date,
      role: "User",
      level: "Bronze",
      enabled: true
    },
    _id: rootId
  }
];

const pictureSeed = [
  {
    title: "Photo 01",
    description: "My photo 01",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/012.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 02",
    description: "My photo 02",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/015.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 03",
    description: "My photo 03",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/018.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 04",
    description: "My photo 04",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/019.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 05",
    description: "My photo 05",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/023.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 06",
    description: "My photo 06",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/028.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 07",
    description: "My photo 07",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/046.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 08",
    description: "My photo 08",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/047.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 09",
    description: "My photo 09",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/049.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 10",
    description: "My photo 10",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/051.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 11",
    description: "My photo 11",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/057.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 12",
    description: "My photo 12",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/060.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 13",
    description: "My photo 13",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/062.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 14",
    description: "My photo 14",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/063.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 15",
    description: "My photo 15",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/066.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 16",
    description: "My photo 16",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/070.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 17",
    description: "My photo 17",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/073.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 18",
    description: "My photo 18",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/074.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 19",
    description: "My photo 19",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/076.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 20",
    description: "My photo 20",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/155.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 21",
    description: "My photo 21",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/085.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 22",
    description: "My photo 22",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/150.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 23",
    description: "My photo 23",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/087.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 24",
    description: "My photo 24",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/088.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 25",
    description: "My photo 25",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/089.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 26",
    description: "My photo 26",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/091.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 27",
    description: "My photo 27",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/092.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 28",
    description: "My photo 28",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/094.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 29",
    description: "My photo 29",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/099.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 30",
    description: "My photo 30",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/102.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 31",
    description: "My photo 31",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/105.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 32",
    description: "My photo 32",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/109.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 33",
    description: "My photo 33",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/115.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 34",
    description: "My photo 34",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/116.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 35",
    description: "My photo 35",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/134.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 36",
    description: "My photo 36",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/136.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 37",
    description: "My photo 37",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/139.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 38",
    description: "My photo 38",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/144.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 39",
    description: "My photo 39",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/148.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  },
  {
    title: "Photo 40",
    description: "My photo 40",
    date: date,
    imgUrl: "https://mdbcdn.b-cdn.net/img/new/slides/084.webp",
    likes: [],
    comments: [],
    visible: "public",
    userId: rootId,
    _id: null
  }
]