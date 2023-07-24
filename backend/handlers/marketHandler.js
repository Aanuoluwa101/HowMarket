const asyncHandler = require('express-async-handler')
const marketProduct = require('../models/marketProduct')


const getMarketProducts = asyncHandler(async (req, res) => {
    //Returns all market products
    const products = await marketProduct.find({}).select('_id name type price').exec()
    const formattedProducts = products.map((product) => {
        const { _id: id, name, type, price } = product;
        return ({ id, name, type, price })
    });
    res.status(200).json(formattedProducts)
})

const addProductToMarket = asyncHandler(async(req, res) => {
    //Add a product to the market and return it
    const { name, type, price } = req.body;
    if (!name || !type || !price) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const product = await marketProduct.create({name, type, price})
    if (!product) {
        res.status(500);
        throw new Error("Error creating product")
    }
    res.status(200).json(product)
})

module.exports = { getMarketProducts, addProductToMarket }