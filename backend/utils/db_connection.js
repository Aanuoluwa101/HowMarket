const mongoose = require("mongoose")
const connectionString = process.env.CONNECTION_STRING 

const db = async () => {
    try {
        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = db;