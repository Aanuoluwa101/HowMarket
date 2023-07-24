'use strict'

const mongoose = require("mongoose")
const Product = require("./product")
const Ledger = require("./ledger")
const User = require("./user")

const storeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    ledgers: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Ledger"
    }],
    products: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product"    
    }]
},
{
  timestamps: true
}
)


storeSchema.methods.getAllProducts = function() {
    return this.populate('products')
      .then((store) => {
        return store.products;
      })
      .catch((error) => {
        throw error;
      });
  };

  storeSchema.methods.getAllLedgers = function() {
    return this.populate('ledgers')
      .then((store) => {
        return store.ledgers;
      })
      .catch((error) => {
        throw error;
      });
  };

  // storeSchema.methods.findLatestLedger = async function () {
  //   try {
  //     const ledgers = this.ledgers;
  
  //     if (ledgers.length === 0) {
  //       return null; // No ledgers found
  //     }
  
  //     // Sort the ledgers based on the createdAt timestamp in descending order
  //     ledgers.sort((a, b) => b.createdAt - a.createdAt);
  
  //     const latestLedger = ledgers[0];
  //     return latestLedger;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  

module.exports = mongoose.model("Store", storeSchema)