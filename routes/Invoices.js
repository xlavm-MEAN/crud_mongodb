const express = require('express')
const invoices = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Invoice = require('../models/Invoice')
invoices.use(cors())

process.env.SECRET_KEY = 'secret'

invoices.post('/register', (req, res) => {
    const today = new Date()
    const invoiceData = {
        invoice_identification: req.body.invoice_identification,
        serial: req.body.serial,
        seller_identification: req.body.seller_identification,
        price: req.body.price,
        date: req.body.date
    }

    Invoice.findOne({
            serial: req.body.serial
        })
        //TODO bcrypt
        .then(invoice => {
            if (!invoice) {
                Invoice.create(invoiceData)
                    .then(invoice => {
                        const payload = {
                            _id: invoice._id,
                            invoice_identification: invoice.invoice_identification,
                            serial: invoice.serial,
                            seller_identification: invoice.seller_identification,
                            price: invoice.price,
                            date: invoice.date
                        }
                        let token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.json({ token: token })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({ error: 'Invoice already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

invoices.post('/login', (req, res) => {
    Invoice.findOne({
            serial: req.body.serial
        })
        .then(invoice => {
            if (invoice) {
                const payload = {
                    _id: invoice._id,
                    invoice_identification: invoice.invoice_identification,
                    serial: invoice.serial,
                    seller_identification: invoice.seller_identification,
                    price: invoice.price,
                    date: invoice.date
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
            } else {
                res.json({ error: 'Invoice does not exist' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

invoices.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    Invoice.findOne({
            _id: decoded._id
        })
        .then(invoice => {
            if (invoice) {
                res.json(invoice)
            } else {
                res.send('Invoice does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = invoices