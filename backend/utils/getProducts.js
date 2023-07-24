const asyncHandler = require("express-async-handler")
const Store = require('../models/store')
const tempStore = require('../models/tempStore')

const getProducts = asyncHandler(async (storeId) => {
     //Returns all the products of a store
    const storeProducts = []

    //Search for products in a regular store
    var products = await Store.findById(storeId).populate('products').exec()
    if (!products) {
        //Not found in a regular store? search in a temporary store
        products = await tempStore.findById(storeId).populate('products').exec()
    } 
    if (products) {
        //format products
        const formattedProducts = products.products.map((product) => {
            const { _id: id, name, type, price } = product;
            return ({ id, name, type, price })
        }
      )
        if (formattedProducts) {
            return formattedProducts
    }
  }
  return storeProducts
})

module.exports = { getProducts }