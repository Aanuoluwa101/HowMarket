const mongoose = require("mongoose")
const Ledger = require("./ledger")

const saleSchema = new mongoose.Schema({
    ledgerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Ledger",
        required: true
    },
    productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
    //calculation for price will be done in the
    //frontend before being sent
},
{
    timestamps: true
}
);


// saleSchema.pre('save', async function (next) {
//     const sale = this;

//     if (sale.isNew) {
//         try {
//             const updatedLedger = await Ledger.findByIdAndUpdate(sale.ledgerId, { $push: { sales: sale._id}}, { new: true });
//             updatedLedger.calculateAggregates(sale.productId, sale.total);
//             updatedLedger.calculateTotal();
//             console.log("updated ledger successfully: ", updatedLedger);
//         } catch (error) {
//             console.error("error updating ledger", error);
//         }       
//   }
//     next();
// })

// salesSchema.post('save', async function (next) {
//     const sale = this;

//     const ledger = await Ledger.findById(sale.ledgerId);
    //ledger.calculateAggregates(sale.productId, sale.total);

// })

module.exports = mongoose.model("Sale", saleSchema)