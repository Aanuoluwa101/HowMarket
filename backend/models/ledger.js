const mongoose = require("mongoose")
const Store = require("./store")
const Sale = require("./sale")

const ledgerSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Store",
        required: true
    },
    sales: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Sale"
    }],
    isOpen: {
        type: Boolean,
        default: true
    },
    total: {
        type: Number,
        default: 0
    },
    aggregates: {
        type: Map,
        of: Number,
        default: {}
      },
    closedAt: Date,
    dateCreated: String
},
{
  timestamps: true
}
);

ledgerSchema.pre('save', function (next) {
  const dateOnly = this.createdAt.toISOString().split('T')[0];
  this.dateCreated = dateOnly;
  next();
});

ledgerSchema.virtual('name').get(function () {
  return `Journal/${this.dateCreated}`;
});

// ledgerSchema.methods.getAllSales = function() {
//     return this.populate('sales').execPopulate()
//       .then((ledger) => {
//         return ledger.sales;
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };

ledgerSchema.methods.calculateAggregates = function(productId, saleTotal) {
    const ledger = this;

    // Update the productSales field
    ledger.aggregates.set(
      productId, (ledger.aggregates.get(productId) || 0) + saleTotal
    );

    // Save the updated ledger
    //return ledger.save();
  }


//   ledgerSchema.pre('save', async function (next) {
//     const ledger = this;

//     if (ledger.isNew) {
//         try {
//             const updatedStore = await Store.findByIdAndUpdate(ledger.storeId, { $push: { ledgers: ledger._id}}, { new: true });
//             console.log("updated store successfully: ", updatedStore);
//         } catch (error) {
//             console.error("error updating store", error);
//         }       
//   }
//     next();
// })

ledgerSchema.methods.calculateTotal = async function () {
  const ledger = this;

  try {
    const sales = await Sale.find({ ledgerId: ledger._id });
    let total = 0;

    sales.forEach((sale) => {
      total += sale.total;
    });

    ledger.total = total;
    await ledger.save();

    return ledger;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to calculate total for ledger');
  }
};



module.exports = mongoose.model("Ledger", ledgerSchema)