const Store = require("../models/store")
const Product = require("../models/product")
const tempStore = require("../models/tempStore")
const asyncHandler = require("express-async-handler")

const getStores = asyncHandler(async (req, res) => {
    const stores = await Store.find({});
    if (!stores) {
        res.status(404);
        throw new Error("no stores found")
    }
    res.status(200).json(stores);
})

// const createStore = asyncHandler(async (req, res) => { 
//     const store = await Store.create(req.body);
//     if (!store) {
//         res.status(500);
//         throw new Error("could not create store");
//     }
//     res.status(201).json(store);
// })

const getStoreInventory = asyncHandler(async (req, res) => { 
    const storeId = req.session.storeId

    const products = await Product.find({ storeId }).select('name');
    const inventory = products.map(product => product.name);
    res.status(200).json(inventory);
})



module.exports = { getStores, getStoreInventory }

