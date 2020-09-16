const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
    invoice_identification: {
        type: String
    },
    serial: {
        type: String
    },
    seller_identification: {
        type: String
    },
    price: {
        type: String
    },
    date: {
        type: String
    }
})

module.exports = Invoice = mongoose.model('invoice', InvoiceSchema)