const express = require("express");
const router = express.Router()
const { isAuth } = require("../middlewares/auth")
const { getProducts, addProduct, editProduct, getAllProducts } = require("../handlers/productHandler")


//get a product's details
//make sure the product is in the current store and exists
// router.route("/products/:id").get((req, res)=>{
//     res.status(200).json({ message: "get a single product"})
// })

//get the current store's products
//public
router.route("/products").get(getProducts)


router.route("/products/all").get(getAllProducts)

//add a product to the current store
//public
router.route("/products").post(addProduct)

//edit a product
//make sure the product is in the current store and exists
//public
//what if they hack into your browser and steal the product
//id sent to react?....lol
router.route("/products/:id").put(editProduct)

// //delete a product from a store and froom the database
// router.route("/products/:id").delete((req, res)=>{
//     res.status(200).json({ message: "delete a product"})
// })

module.exports =  router;

