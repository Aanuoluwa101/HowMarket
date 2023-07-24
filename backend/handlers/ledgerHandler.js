const asyncHandler = require('express-async-handler');
const Store = require("../models/store")
const tempStore = require("../models/tempStore")
const Ledger = require("../models/ledger")
const Sale = require("../models/sale");


const createLedger = asyncHandler(async (req, res) => {
    //Creates or opens a new ledger
    const { openLedgerId, storeId } = req.session
   
    if (openLedgerId) {
        //If there is already an open ledger associated with the current session
        //disallow the opening of a new one
        const ledger = await Ledger.findOne({ _id: openLedgerId, storeId, isOpen: true })
        if (ledger) {
          res.status(401);
          throw new Error("only one ledger can be open at a time")
        }
     
    }

    if (!req.session.isLoggedIn) {
        //if the user is not logged in, create a Temporary store, attach a ledger to it
        //and associate both store and ledger with the session
        const store = await tempStore.create({name: "TempStore"})
        if (!store) {
            res.status(500);
            throw new Error("could not create store")
        }

        const ledger = await Ledger.create({ storeId: store._id });
        if (!ledger) {
            await tempStore.findByIdAndDelete(store._id)
            res.status(500);
            throw new Error("could not create ledger")
        }
        await ledger.save()
        store.ledger = ledger._id
        await store.save()

        req.session.openLedgerId = ledger._id 
        req.session.storeId = store._id
        res.status(200).json({store})
    } else {
        //if the user is logged in, find their store (using the storeId associated with the session)
        //and create a new ledger, attaching thesame to the session
        const storeId = req.session.storeId
        const store = await Store.findById(storeId)
        if (!store) {
            res.status(404);
            throw new Error("store not found");
        }
        const ledger = await Ledger.create({ storeId });
        if (!ledger) {
            res.status(500);
            throw new Error("could not create ledger")
        }
        await ledger.save()
        store.ledgers.push(ledger._id)
        await store.save()

        req.session.openLedgerId = ledger._id 
        res.status(200).json({store})
    }
});


const getClosedLedgers = async (req, res) => {
    //Returns all closed ledgers of a store (store id from session), sorted from latest to oldest
    const storeId = req.session.storeId
    try {
      const closedLedgers = await Ledger.find({ storeId, isOpen: false })
      .select('_id dateCreated createdAt closedAt total')
      .sort({ createdAt: -1 })
      .exec();
  
      //format the retrieved ledgers
      const formattedLedgers = closedLedgers.map((ledger) => {
        return {
          id: ledger._id,
          name: ledger.name,
          timeCreated: ledger.createdAt.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          timeClosed: ledger.closedAt.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
          totalAmount: ledger.total,
        };
      });
  
      res.json(formattedLedgers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve closed ledgers' });
    }
};
  

const getLedgerSales = asyncHandler(async (req, res) => {
    //Finds a ledger and returns all its sales
    const ledgerId = req.params.id;
    
    const sales = await Sale.find({ ledgerId })
      .populate('productId', ['name', 'price'])
      .select('productId count total createdAt')
      .exec();
  
    if (!sales) {
        res.status(404);
        throw new Error("ledger not found")
    }

    //format the sales
    const formattedSales = sales.map((sale) => ({
      id: sale._id,
      productName: sale.productId.name,
      productPrice: sale.productId.price,
      createdAt: sale.createdAt.toLocaleString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true }),
      count: sale.count,
      total: sale.total,
    }));
  
    res.status(200).json(formattedSales);
  });


const addSaleToLedger = asyncHandler(async (req, res) => {
    //Records a sale in a ledger and returns the ledger and the new sale
    const storeId = req.session.storeId
    const ledgerId = req.params.id;
    const { productId, count, total } = req.body

    if (!productId || !count || !total) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }

    //find the open ledger
    const ledger = await Ledger.findOne({_id: ledgerId, storeId, isOpen: true});
    if (!ledger) {
        res.status(404);
        throw new Error("ledger not found or not open")
    }

    //create a sale 
    const sale = await Sale.create({ ledgerId, productId, count, total })
    if (!sale) {
        res.status(500);
        throw new Error("error creating sale")
        } 

    //add the sale to the ledger's array of sales
    await ledger.sales.push(sale._id)

    //calculate (or recalculate) the aggregates of each product
    await ledger.calculateAggregates(sale.productId, sale.total)

     //and calculate the ledger total
    await ledger.calculateTotal()

    res.status(200).json({"ledger": ledger, "sale": sale})
});


const closeLedger = asyncHandler(async (req, res) => {
    //find the the open ledger whose id is specified in the url and close it
    const filter = { storeId: req.session.storeId, _id: req.params.id, isOpen: true }
    const data = { isOpen: false }

    const ledger = await Ledger.findOneAndUpdate(filter, data);
    if (!ledger) {
        res.status(404);
        throw new Error("ledger not found");
    }
  
    //set the ledger's closedAt attribute to the current time and remove ledger from the current session
    ledger.closedAt = Date.now()
    await ledger.save();
    delete req.session.openLedgerId;
    req.session.save();
    res.status(200).json({"message": "successfully closed ledger", 
                           "ledger": ledger})
});

module.exports = { closeLedger, createLedger, getClosedLedgers, getLedgerSales, addSaleToLedger };