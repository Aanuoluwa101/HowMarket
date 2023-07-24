const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/auth")
const { closeLedger, createLedger, getClosedLedgers, getLedgerSales, addSaleToLedger } = require("../handlers/ledgerHandler");

//get store ledgers based on sessionId
//private
router.route("/ledgers").get(isAuth, getClosedLedgers)

//create new ledger based on sessionId
//public
router.route("/ledgers").post(createLedger);

//return a ledger's information based on sessionId
//private
router.route("/ledgers/:id").get(isAuth, getLedgerSales)

//add a sale to a ledger
//public
router.route("/ledgers/:id").post(addSaleToLedger)

//public
router.route("/ledgers/:id").put(closeLedger)



module.exports = router;
//64ad1761db7f601d0af640b7

