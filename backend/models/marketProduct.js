const mongoose = require("mongoose")


const marketProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{
    timestamps: true
  });


module.exports = mongoose.model("marketProduct", marketProductSchema)