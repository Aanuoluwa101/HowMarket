const express = require("express")
const cookieParser = require('cookie-parser')
const errorHandler = require("./middlewares/errorHandler")
const { sessionHandler } = require("./middlewares/sessionHandler")
const cors = require('cors');
const app = express()
const dotenv = require("dotenv").config()
const connectDB = require('./utils/db_connection')

connectDB();
const client = process.env.CLIENT 
app.use(cors({
  credentials: true,
  origin: client,
}));

app.use(sessionHandler)
app.use(cookieParser());
app.use(express.json());
app.use('/', require("./routes/ledgerRoutes"));
app.use('/', require("./routes/productRoutes"));
app.use('/', require("./routes/storeRoutes"));
app.use('/', require("./routes/marketRoutes"));
app.use('/users', require("./routes/userRoutes"));
app.use(errorHandler);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
