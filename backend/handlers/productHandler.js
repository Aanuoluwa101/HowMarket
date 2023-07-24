const asyncHandler = require("express-async-handler")
const Store = require("../models/store")
const tempStore = require("../models/tempStore")
const Product = require("../models/product")



const getProducts = asyncHandler(async (req, res) => {
    const storeId = req.session.storeId

    if (!storeId) {
        console.log("no store id")
        res.send("not found")
        return;
    }
    
    var products = await Store.findById(storeId).populate('products').exec()
    if (!products) {
        products = await tempStore.findById(storeId).populate('products').exec()
        // if (!products){
        //     res.status(404);
        //     throw new Error("store not found or no products");
        // }
    } 
    const formattedProducts = products.products.map((product) => {
        const { _id: id, name, type, price } = product;
        return ({ id, name, type, price })
    }
  )

    res.status(200).json(formattedProducts)
   
});


const addProduct = asyncHandler(async (req, res) => {
    const storeId = req.session.storeId;
    const { name, type, price } = req.body
    if (!name || !type || !price) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }

    if (storeId) {
        var store = await Store.findById(storeId)
        if (!store) {
            store = await tempStore.findById(storeId)
            if (!store) {
                res.status(404);
                throw new Error("store not found");
            }
        } 
        const product = await Product.create({ name, type, storeId, price })
        // console.log("storeId from session: ", storeId);
        // console.log("storeId from created store: ", store._id);
        // console.log("store products before push", store.products)
        // console.log("productId: ", product._id)
        store.products.push(product._id)
        await store.save()
        // console.log("store products after push", store.products);
        
        res.status(200).json(product)
    } else {
        res.status(401);
        throw new Error("access denied")
    }
});


// const getProduct = asyncHandler(async (req, res) => {
//     console.log("new")
// });


const editProduct = asyncHandler(async (req, res) => {
    const { name, type, price } = req.body
    const storeId = req.session.storeId
    if (!name || !type || !price) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }

    const newData = { name, type, price }
    const filter = { storeId, _id: req.params.id } 

    const updatedProduct = await Product.findOneAndUpdate(
        filter,
        newData,
        { new: true }    
    );

    if (!updatedProduct) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.status(200).json(updatedProduct)
});


const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.status(200).json(products)
}
    );



module.exports = { getProducts, addProduct, editProduct, getAllProducts }