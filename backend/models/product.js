const mongoose = require("mongoose")
const Store = require("./store")


const productSchema = mongoose.Schema({
    storeId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Store",
        required: true
    },
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


module.exports = mongoose.model("Product", productSchema)