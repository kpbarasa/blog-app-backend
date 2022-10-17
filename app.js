const express = require("express")
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const exphbs = require('express-handlebars')
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')
const morgan = require('morgan')
const passport = require('passport')
const path = require('path')
const fs = require('fs')
var cors = require('cors')


// Passport config
require('./config/passport')(passport)

var app = express();

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// Cross Resource Origin
app.use(cors())



//  Mongo db Sessionstore 
const store = new MongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "account-user-sessions",
})

//  Session Setup
app.use(session({

  // It holds the secret key for session
  secret: 'keyboard cat',

  // Forces the session to be saved
  // back to the session store
  resave: true,

  // Forces a session that is "uninitialized"
  // to be saved to the store
  saveUninitialized: true,

  cookie: {

    // Session expires after 1 min of inactivity.
    expires: 60000
    // expires: 1000 * 60 * 60 * 24
  },
  store: store
}))

// Routes
// app.use("", require(""));

//Error handlers
const errorHandlers = require("./handlers/errorHandler")
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);



// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Logging
if (process.env.NODE_ENV === 'development') {

  app.use(morgan('dev'))

  // log only 4xx and 5xx responses to console
  // app.use(morgan('dev', {
  //   skip: function (req, res) { return res.statusCode < 400 }
  // }))


  // log all requests to access.log
  app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a' })
  }))
}

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

// Handlebars
app.engine(
  '.hbs',
  exphbs.engine({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, }), // STORE SESSION IN DB
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})


// ROUTES //
app.use(process.env.Blog_Domain + '/media/img/:id', (req, res) => { // Images media route
  res.sendFile(path.join(__dirname + '/assets/images/' + req.params.id))
});
app.use(process.env.Blog_Domain + '/media/vid/:id', (req, res) => { // Videos media route
  res.sendFile(path.join(__dirname + '/assets/videos/' + req.params.id))
});

// Routes Posts
// app.use('/', require('./routes/index'))
app.use(process.env.Blog_Domain + '/auth', require('./routes/auth'))
app.use(process.env.Blog_Domain + '/posts', require('./routes/posts'))
app.use(process.env.Blog_Domain + '/comments', require('./routes/comments'))
app.use(process.env.Blog_Domain + '/media', require('./routes/media'))

// Routes USER 
app.use('/blog/user', require('./backend-user/routes/user-account-access.route'))

module.exports = app;