const express = require('express')
const machines = express.Router()
const Machine = require('../models/Machine')

const cors = require('cors')
const jwt = require('jsonwebtoken')
machines.use(cors())
process.env.SECRET_KEY = 'secret'


machines.post('/register', (req, res) => {
    const today = new Date()
    const machineData = {
        serial: req.body.serial,
        brand: req.body.brand,
        model: req.body.model,
        ubication: req.body.ubication,
        price_shopping: req.body.price_shopping,
        receipt_shopping: req.body.receipt_shopping,
        creation_date: req.body.creation_date,
        sale_date: req.body.sale_date,
        seller_identification: req.body.seller_identification,
        state: req.body.state
    }

    Machine.findOne({
            serial: req.body.serial
        })
        //TODO bcrypt
        .then(machine => {
            if (!machine) {
                Machine.create(machineData)
                    .then(machine => {
                        const payload = {
                            _id: machine._id,
                            serial: machine.serial,
                            brand: machine.brand,
                            model: machine.model,
                            ubication: machine.ubication,
                            price_shopping: machine.price_shopping,
                            receipt_shopping: machine.receipt_shopping,
                            creation_date: machine.creation_date,
                            sale_date: machine.sale_date,
                            seller_identification: machine.seller_identification,
                            state: machine.state
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
                res.json({ error: 'Machine already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

machines.get('/find', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    Machine.findOne({
            _id: decoded._id
        })
        .then(machine => {
            if (machine) {
                res.json(machine)
            } else {
                res.send('Machine does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = machines