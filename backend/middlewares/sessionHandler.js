const dotenv = require("dotenv").config()
const session = require('express-session')
const MongoStore = require('connect-mongo') 
const connectionString = process.env.CONNECTION_STRING


const sessionStore = MongoStore.create({
    mongoUrl: connectionString,
    ttl: 600000
})

const sessionOptions = {
    secret: 'la-bush',
    cookie: { maxAge: 600000, httpOnly: true, signed: true },
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}
const sessionHandler = session(sessionOptions)

module.exports = { sessionHandler }
