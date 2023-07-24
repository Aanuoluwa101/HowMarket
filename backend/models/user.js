const mongoose = require('mongoose')
const Store = require('./store')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    storeId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Store",
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema)