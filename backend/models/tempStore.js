'use strict'
const mongoose = require("mongoose")
const Product = require("./product")
const Ledger = require("./ledger")
//const User = require("./user")

const tempStoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ledger: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Ledger"
    },
    products: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product"    
    }]
},
{
  timestamps: true
}
);


tempStoreSchema.methods.getAllProducts = function() {
    return this.populate('products')
      .then((store) => {
        return store.products;
      })
      .catch((error) => {
        throw error;
      });
  };

  tempStoreSchema.methods.getAllLedgers = function() {
    return this.populate('ledger')
      .then((store) => {
        return store.ledger;
      })
      .catch((error) => {
        throw error;
      });
  };
  
  tempStoreSchema.methods.compareAndAddProducts = function(storeB) {
    const storeA = this;
  
    // Find the products in Store A that are not in Store B
    const productsToAdd = storeA.products.filter((productA) => {
      return !storeB.products.some((productB) => productB.name === productA.name);
    });
  
    // Add the missing products to Store B
    storeB.products.push(...productsToAdd);
  
    // Save the updated Store B
    return storeB.save();
  };


module.exports = mongoose.model("tempStore", tempStoreSchema)