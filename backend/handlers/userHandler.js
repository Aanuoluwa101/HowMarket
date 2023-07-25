const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const Store = require("../models/store")
const bcrypt = require("bcrypt")
const Ledger = require("../models/ledger")
const tempStore = require("../models/tempStore")
const { findLedger } = require('../utils/findLedger')
const { getProducts } = require('../utils/getProducts')

//@desc Register new user
//@route POST /users/register
//access public
const registerUser = asyncHandler(async (req, res) => {
    //Registers a user and returns the new user
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("all fields are mandatory")
    }

    //Check email uniqueness
    const emailTaken = await User.findOne({ email })
    if (emailTaken) {
        res.status(401)
        throw new Error("email taken")
    }

    //create a new store 
    const store = await Store.create({name: username})
    if (!store) {
        res.status(500)
        throw new Error("could not create store")
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    //create user and attach new store to it
    const user = await User.create({username,
                                   email, 
                                   password: hashedPassword,
                                   storeId: store._id});
    if (user) {
        await user.save()
        res.status(201).json({ _id: user._id,
                               email: user.email,
                               storeId: user.storeId})
    } else {
        res.status(500);
        throw new Error("could not create user")
    }
});


const loginUser = asyncHandler(async (req, res) => {
    //Logs a user in
    const { email, password } = req.body;
    if (!email || !password ) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }
    const user = await User.findOne({ email })

    //check if user is already logged in by checking if thier store id is in the current session
    if (user && (await bcrypt.compare(password, user.password))){
        if (req.session.storeId == user.storeId && req.session.isLoggedIn){
            res.status(200).json({"message": "user already logged in"})
            return;
        }

        //if there is a ledger associated with the current sesssion 
        //(perhaps from using a temporary store), remove it
        if (req.session.openLedgerId){
            delete req.session.openLedgerId
            req.session.save()
        }

        //attach the user's store to the current session and mark user as logged in
        req.session.storeId = user.storeId
        req.session.isLoggedIn = true
        res.send("login successful")
    } else {
        res.status(401);
        throw new Error("Invalid email or password")
    } 
});



const sessionInfo = asyncHandler(async (req, res) => {
    //Returns details of the current session based on the store attached to the session
    const storeId = req.session.storeId;
    const result = { "store": null, "ledger": {}, products: [] }

    console.log("session id: ", req.session.id)
    console.log("attached store: ", req.session.storeId)
    if (!storeId) {
        res.status(200).json(result)
        return;
    }

    //Find the store (or temporary store) attached to the current session
    var store = await Store.findById(storeId).select('name');
    if (!store) {
        store = await tempStore.findById(storeId).select('name');
        if (!store){
            res.status(404);
            throw new Error("store not found");
        }
    }

    //Add the store's name to the return object
    result.store = await store.name

    //Add store's producst to the return object
    result.products = await getProducts(storeId)

    //Add the store's open ledger or last-closed-ledger to the return object
    result.ledger = await findLedger(storeId)

    //Add login status
    result.isLoggedIn = req.session.isLoggedIn ? true : false
    
    res.status(200).json(result)
});


const logout = asyncHandler(async (req, res) => {
    //Logs a user out by destroying the session object
    req.session.destroy((err) => {
        if (err) {
          console.error('Error Loggin user out:', err);
          return res.status(500).json({ message: 'Server error' })
        }
        res.status(200).json({ message: 'Logout successful' })
      });
})

const loginStatus = asyncHandler(async(req, res) => {
    //Returns a current session's login status
    if (req.session.isLoggedIn){
        res.status(200).json({ "isLoggedIn": true })
    } else {
        res.status(200).json({ "isLoggedIn": false })
    }
})

module.exports = { registerUser, loginUser, sessionInfo, logout, loginStatus }
