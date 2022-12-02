const path = require('path');

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoConnect = require('./utils/database').mongoConnect;
const mongoDB = require('./utils/database').MONGODB_URI;
const addToLogs = require('./utils/logs');

const csrfCheck = require('./middlewares/csrfCheck');

const indexRoutes = require('./routes/index');
const editRoutes = require('./routes/editing');
const manageRoutes = require('./routes/managing');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const pwdRoutes = require('./routes/password');
const modoRoutes = require('./routes/moderation');
const adminRoutes = require('./routes/admin');

const errorController = require('./controllers/error');

global.domainName = process.env.MODE === "DEV" ? process.env.URL_DEV : process.env.URL_PROD;

const port = parseInt(process.env.PORT) || 3000;
const sessionSecret = process.env.SESSION_KEY;

if (!sessionSecret) {
  const error = new Error("Env Error: The 'SESSION_KEY' environment variable is required.");

  error.httpStatusCode = 500;
  throw error;
}

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/gallery/data', express.static(path.join(__dirname, 'data')));
app.use('/gallery/user/data', express.static(path.join(__dirname, 'data')));
app.use('/admin/data', express.static(path.join(__dirname, 'data')));
app.use('/admin/gallery/data', express.static(path.join(__dirname, 'data')));
app.use('/admin/picture/user/data', express.static(path.join(__dirname, 'data')));

const storeDB = new MongoDBStore({
  uri: mongoDB,
  collection: 'sessions'
});

app.use(
  session({
    name: 'SESS_ID',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: storeDB,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    }
  })
);

app.use((req, res, next) => {
  csrfCheck(req, res, next);
});

app.use((req, res, next) => {
  res.locals.authenticated = req.session.authenticated;
  res.locals.csrfToken = req.session.csrfToken;
  next();
});

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Frame-Options', 'deny');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header("X-Powered-By", "Blood, sweat, and tears.");
  next();
});

app.use(indexRoutes);
app.use(editRoutes);
app.use(manageRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(pwdRoutes);
app.use(modoRoutes);
app.use(adminRoutes);
app.use(errorController.get404);

app.use((error, req, res, next) => {
  addToLogs("ERROR", error);
  
  if (req.method === 'GET') {
    res.status(error.httpStatusCode).render("error/500", {
      pageTitle: "Internal Server Error",
      path: "500",
      authenticated: req.session.authenticated,
      csrfToken: req.session.csrfToken
    });
  } else {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
  
});

mongoConnect((err) => {
  if (err) {
    addToLogs("DB ERROR", "Failed to connect to MongoDB Atlas/" + err);
    process.exit(1);
  }

  app
    .listen(port)
    .on('error', (err) => {
      addToLogs("EXPRESS ERROR", "Failed to create http server/" + err);
      process.exit(1);
    });
});
