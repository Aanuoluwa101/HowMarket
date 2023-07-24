const express = require('express')
const router = express.Router()
const { getMarketProducts, addProductToMarket } = require("../handlers/marketHandler")


router.route('/market').get(getMarketProducts);

router.route('/market/add').put(addProductToMarket);

module.exports = router;