const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MachineSchema = new Schema({
    serial: {
        type: String
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    ubication: {
        type: String
    },
    price_shopping: {
        type: String
    },
    receipt_shopping: {
        type: String
    },
    creation_date: {
        type: String
    },
    sale_date: {
        type: String
    },
    seller_identification: {
        type: String
    },
    state: {
        type: String
    }
}, {
    collection: 'machine'
});

module.exports = mongoose.model('Machine', MachineSchema);