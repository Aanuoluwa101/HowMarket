const asyncHandler = require("express-async-handler")
const Ledger = require('../models/ledger')
const Store = require('../models/store')
const tempStore = require('../models/tempStore')


const findLedger = asyncHandler(async (storeId) => {
    //Finds the open ledger or last-closed-ledger of a store
     ledger = {}

    //Note that only one ledger is allowed to be opened in a store at a time, 
    //as implemented in the createLedger function
    const openLedger = await Ledger.findOne({ storeId, isOpen: true });
    if (openLedger) {
        //If there is an open ledger in the store, add its details to the return object
        const name = openLedger.name;
        const { id: _id, aggregates, total, isOpen } = openLedger
        return { name, id: _id, aggregates, total, isOpen };
    } else {
        //If there is no open ledger, then find the last closed ledger

        //Search for the ledger in regular store
        var store = await Store.findById(storeId).populate('ledgers').exec()
        if (store) {
            const ledgers = store.ledgers.sort((a, b) => b.closedAt - a.closedAt);
            const lastClosedLedger = ledgers.find((ledger) => !ledger.isOpen);

            if (lastClosedLedger){
                const name = lastClosedLedger.name;
                const { id: _id, aggregates, total, isOpen } = lastClosedLedger
                return { name, id: _id, aggregates, total, isOpen }
            }
        } else {
            //Search for the ledger in a temporary store (a temporary store can only have one ledger)
            store = await tempStore.findById(storeId).populate('ledger').exec()
            if (store) {
                const lastClosedLedger = store.ledger;
                if (lastClosedLedger){
                    const name = lastClosedLedger.name;
                    const { id: _id, aggregates, total, isOpen } = lastClosedLedger
                    return { name, id: _id, aggregates, total, isOpen }
                }
            }
        }      
    }
    return ledger;
})

module.exports = { findLedger }
    
   