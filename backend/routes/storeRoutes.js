const express = require("express");
const router = express.Router()
const { getStores, getStoreInventory } = require("../handlers/storeHandler")

//this route will only be used internally
router.route('/stores').get(getStores)


//start a session and attach the storeId and ledgerId to the session
//router.route('/stores').post(createStore)


router.route('/store/inventory').get(getStoreInventory)


module.exports = router;

//regisetring or when a non-logged in user or non-user creates a ledger
//at registration there is already function for creating store
//what we handle here is creating temporary stores...
//attach a ledger,